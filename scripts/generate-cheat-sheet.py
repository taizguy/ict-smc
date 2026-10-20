import os,json,shutil
from pathlib import Path
import arabic_reshaper
from bidi.algorithm import get_display
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor,Color
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader

data=json.loads(Path('outputs/learning-update/cheat-data.json').read_text(encoding='utf-8'))
ur=json.loads(Path('src/i18n/learning-update-urdu.json').read_text(encoding='utf-8'))
font_path=os.environ.get('LEARNSMC_URDU_FONT','C:/Windows/Fonts/arial.ttf')
if not Path(font_path).is_file():raise SystemExit('Set LEARNSMC_URDU_FONT to a TTF font supporting shaped Urdu glyphs (for example Arial).')
pdfmetrics.registerFont(TTFont('Urdu',font_path))
INK=HexColor('#223b35');GREEN=HexColor('#23796d');RED=HexColor('#b44746');VIOLET=HexColor('#705692');MUTED=HexColor('#52645b');PAPER=HexColor('#f3f7f4');LINE=HexColor('#d4dfd7')
W,H=A4
out=Path('output/pdf');out.mkdir(parents=True,exist_ok=True)
for language in ['en','ur']:
 rtl=language=='ur';font='Urdu' if rtl else 'Helvetica'
 dest=out/f'learnsmc-ict-smc-cheat-sheet-{language}.pdf'
 c=canvas.Canvas(str(dest),pagesize=A4,pageCompression=1)
 c.setTitle('ICT/SMC Glossary & Cheat Sheet - '+('Urdu' if rtl else 'English'))
 c.setAuthor('Muhammad Umer Ijaz / LearnSMC');c.setSubject('Original educational definitions, schematic diagrams and an observation checklist. Not investment advice.')
 def text(en):return ur.get(en,en) if rtl else en
 def shape(s):return get_display(arabic_reshaper.reshape(s),base_dir='R').replace('\u200e','') if rtl else s
 def draw(s,x,y,size=11,width=None,color=INK,bold=False,translate=True):
  s=text(s) if translate else s;face=font if rtl else 'Helvetica-Bold' if bold else 'Helvetica';actual=shape(s)
  if width:
   while pdfmetrics.stringWidth(actual,face,size)>width and size>7:size-=.25
  c.setFillColor(color);c.setFont(face,size)
  if rtl:
   # Preserve logical Unicode for selection in readers supporting ActualText.
   c._code.append('/Span << /ActualText <'+('feff'+s.encode('utf-16-be').hex())+'> >> BDC')
   c.drawRightString(x, y, actual);c._code.append('EMC')
  else:c.drawString(x,y,actual)
 def para(s,x,y,width,size=11,leading=17,color=INK,translate=True):
  s=text(s) if translate else s;words=s.split();lines=[];line=''
  for word in words:
   test=(line+' '+word).strip()
   if pdfmetrics.stringWidth(shape(test),font,size)>width and line:lines.append(line);line=word
   else:line=test
  if line:lines.append(line)
  for row in lines:draw(row,x+width if rtl else x,y,size,color=color,translate=False);y-=leading
  return y
 def page(n,title):
  c.setFillColor(GREEN);c.rect(0,H-13,W,13,fill=1,stroke=0)
  c.setFont('Helvetica-Bold',12);c.setFillColor(GREEN);c.drawString(45,H-46,'LearnSMC')
  c.setFont('Helvetica',9);c.setFillColor(MUTED);c.drawRightString(W-45,H-46,'ICT / SMC  -  FREE REFERENCE')
  c.setStrokeColor(LINE);c.line(45,50,W-45,50)
  c.setFont('Helvetica',8);c.setFillColor(MUTED);c.drawString(45,33,'Muhammad Umer Ijaz  |  learnsmc.xyz  |  20 Oct 2026')
  c.drawRightString(W-45,33,f'{n} / 4')
  draw(title,W-45 if rtl else 45,H-85,21,width=W-90,bold=True)
 def candle(x,y,o,cl,hi,lo,scale=1):
  color=GREEN if cl>o else RED;c.setStrokeColor(color);c.setFillColor(color);c.setLineWidth(1.5);c.line(x,y+lo*scale,x,y+hi*scale);c.roundRect(x-7,y+min(o,cl)*scale,14,max(2,abs(cl-o)*scale),1,stroke=0,fill=1)
 def panel(bottom,title,definition,kind):
  c.setFillColor(PAPER);c.setStrokeColor(LINE);c.roundRect(45,bottom,W-90,150,10,stroke=1,fill=1)
  draw(title,W-60 if rtl else 60,bottom+126,13,width=W-120,bold=True)
  if kind=='fvg':
   c.setFillColor(Color(.14,.47,.42,alpha=.12));c.setStrokeColor(GREEN);c.rect(64,bottom+56,204,18,fill=1,stroke=1)
   candle(95,bottom+10,18,36,46,8);candle(153,bottom+10,36,82,89,31);candle(211,bottom+10,80,94,105,64)
   c.setStrokeColor(GREEN);c.setDash(3,3);c.line(64,bottom+65,268,bottom+65);c.setDash();c.setFont('Helvetica',8);c.setFillColor(GREEN);c.drawString(240,bottom+82,'FVG')
  elif kind=='ob':
   c.setFillColor(Color(.14,.47,.42,alpha=.12));c.setStrokeColor(GREEN);c.rect(68,bottom+30,204,25,fill=1,stroke=1)
   candle(90,bottom+10,45,20,56,10);candle(133,bottom+10,20,63,70,12);candle(176,bottom+10,63,89,101,57)
   c.setStrokeColor(VIOLET);c.setDash(3,3);p=c.beginPath();p.moveTo(184,bottom+99);p.lineTo(220,bottom+83);p.lineTo(255,bottom+42);c.drawPath(p);c.setDash()
  else:
   c.setStrokeColor(VIOLET);c.setDash(3,3);c.line(65,bottom+80,270,bottom+80);c.setDash()
   c.setStrokeColor(GREEN);p=c.beginPath();p.moveTo(65,bottom+40);p.lineTo(92,bottom+80);p.lineTo(122,bottom+46);p.lineTo(152,bottom+80);p.lineTo(180,bottom+45);c.drawPath(p)
   candle(217,bottom+10,55,45,105,35);c.setStrokeColor(RED);c.line(225,bottom+55,265,bottom+35)
  para(definition,300,bottom+98,W-365,10.2,15)
 page(1,'ICT/SMC Glossary & Cheat Sheet')
 intro='A compact guide to observable definitions. Schematics are not trading signals, guarantees or evidence of institutional intent.'
 para('قابلِ مشاہدہ تعریفوں کا مختصر رہنما۔ خاکے ٹریڈنگ سگنل، ضمانت یا ادارہ جاتی نیت کا ثبوت نہیں۔' if rtl else intro,45,H-120,W-90,11,18,translate=False)
 panel(475,'Fair value gap (FVG)',data['cheatSheetTerms'][7][1],'fvg')
 panel(300,'Order block (OB)',data['cheatSheetTerms'][10][1],'ob')
 panel(125,'Liquidity sweep',data['cheatSheetTerms'][2][1],'sweep')
 draw('اصل نوٹس اور خاکے۔ مکمل تعریفیں اگلے صفحات پر ہیں۔' if rtl else 'Original notes and diagrams. Full definitions continue on the next pages.',W-45 if rtl else 45,88,9,width=W-90,color=MUTED,translate=False)
 c.showPage()
 for page_no,terms in [(2,data['cheatSheetTerms'][:10]),(3,data['cheatSheetTerms'][10:])]:
  page(page_no,'The glossary');y=H-125
  for term,definition in terms:
   draw(term,W-48 if rtl else 48,y,11.4,width=W-96,bold=True,color=GREEN)
   y=para(definition,48,y-18,W-96,10.5,15,color=INK)-10
  if y<65:raise RuntimeError(f'Glossary overflow in {language} page {page_no}: {y}')
  c.showPage()
 page(4,'Before you mark a setup');y=H-127
 for i,q in enumerate(data['cheatSheetQuestions'],1):
  c.setStrokeColor(GREEN);c.rect(48 if not rtl else W-60,y-4,11,11,fill=0,stroke=1)
  y=para(q,70 if not rtl else 48,y,W-120,10.6,17)-14
 y-=12
 draw('مثالی رسک کا حساب' if rtl else 'Illustrative risk arithmetic',W-48 if rtl else 48,y,14,bold=True,translate=False);y-=27
 c.setFillColor(PAPER);c.roundRect(45,y-73,W-90,87,8,fill=1,stroke=0)
 if rtl:
  draw('لانگ: انٹری 100  |  اسٹاپ 98  |  ہدف 104',W-59,y-7,12,color=GREEN,translate=False)
  draw('منصوبہ بند رسک 2 پوائنٹس، ریوارڈ 4 پوائنٹس، تناسب 2R۔',W-59,y-29,10,translate=False)
  draw('0.05R لاگت پر: ہدف ‎+1.95R‎، اسٹاپ ‎-1.05R‎، اضافی سلپیج سے پہلے۔',W-59,y-49,10,translate=False)
 else:
  c.setFont('Helvetica-Bold',12);c.setFillColor(GREEN);c.drawString(59,y-7,'LONG: Entry 100  |  Stop 98  |  Target 104')
  c.setFont('Helvetica',10);c.setFillColor(INK);c.drawString(59,y-29,'Planned risk = 2 points. Planned reward = 4 points. Ratio = 2R.')
  c.drawString(59,y-49,'At 0.05R cost: target +1.95R, stop -1.05R before extra slippage.')
 y=para('یہ فرضی حساب ہے۔ اصل اسٹاپ پر گیپ یا سلپیج نقصان بڑھا سکتے ہیں۔' if rtl else 'Fictional arithmetic only. Gaps and slippage can increase the loss at a real stop.',48,y-94,W-96,10,16,translate=False)-22
 draw('Sources and interpretation',W-48 if rtl else 48,y,13,bold=True);y-=22
 for source in data['cheatSheetSources']:
  draw(source['title'],W-48 if rtl else 48,y,9.5,width=W-96,color=GREEN)
  c.linkURL(source['url'],(45,y-3,W-45,y+12),relative=0,thickness=0)
  # Full URLs are usable, selectable and visible in the PDF.
  c.setFont('Helvetica',6.8);c.setFillColor(MUTED);c.drawString(48,y-12,source['url']);y-=34
 if y<65:raise RuntimeError(f'Checklist overflow in {language}: {y}')
 c.save()
 if len(PdfReader(str(dest)).pages)!=4:raise RuntimeError('Expected exactly four pages')
 shutil.copyfile(dest,Path('public/downloads')/dest.name)
 print(dest, dest.stat().st_size, 'bytes / 4 pages')


