"""Prepare cached drafts of public website copy. No API key or paid Cloud API.

Uses the free public translation interface only during editorial preparation.
It is not a production dependency. Stops on rate limits; never rotates identities.
Manual Urdu entries take precedence over this generated draft catalog.
"""
import argparse
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import unicodedata
from collections import Counter
from decimal import Decimal
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--limit', type=int, default=0)
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
work = root / 'outputs/urdu-localization'
corpus = json.loads((work / 'translation-corpus.json').read_text(encoding='utf-8'))
destination = root / 'src/i18n/urdu-generated.json'
cache_path = work / 'draft-parts.json'
cache = json.loads(cache_path.read_text(encoding='utf-8')) if cache_path.exists() else {}
catalog = json.loads(destination.read_text(encoding='utf-8'))
failures_path = work / 'draft-failures.json'
failures = json.loads(failures_path.read_text(encoding='utf-8')) if failures_path.exists() else {}

def save_json(path, value, newline=False):
 temporary = path.with_suffix(path.suffix + '.tmp')
 temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + ('\n' if newline else ''), encoding='utf-8')
 temporary.replace(path)

terms = {
 'Market Structure Shift': 'مارکیٹ اسٹرکچر شفٹ (Market Structure Shift)',
 'Change of Character': 'چینج آف کریکٹر (Change of Character)',
 'Break of Structure': 'بریک آف اسٹرکچر (Break of Structure)',
 'Fair Value Gaps': 'فیئر ویلیو گیپس (Fair Value Gaps)',
 'Fair Value Gap': 'فیئر ویلیو گیپ (Fair Value Gap)',
 'Order Blocks': 'آرڈر بلاکس (Order Blocks)', 'Order Block': 'آرڈر بلاک (Order Block)',
 'Liquidity Sweeps': 'لیکویڈیٹی سویپس (Liquidity Sweeps)', 'Liquidity Sweep': 'لیکویڈیٹی سویپ (Liquidity Sweep)',
 'Market Structure': 'مارکیٹ اسٹرکچر (Market Structure)',
 'Order Flow': 'آرڈر فلو (Order Flow)', 'Order Book': 'آرڈر بک (Order Book)',
 'Buy-Side Liquidity': 'بائے سائیڈ لیکویڈیٹی (Buy-Side Liquidity)',
 'Sell-Side Liquidity': 'سیل سائیڈ لیکویڈیٹی (Sell-Side Liquidity)',
 'Premium': 'پریمیم (Premium)', 'Discount': 'ڈسکاؤنٹ (Discount)',
 'Consequent Encroachment': 'کانسیکوئنٹ اِنکروچمنٹ (Consequent Encroachment)',
 'Balanced Price Range': 'بیلنسڈ پرائس رینج (Balanced Price Range)',
 'Optimal Trade Entry': 'آپٹیمل ٹریڈ انٹری (Optimal Trade Entry)',
 'Breaker Block': 'بریکر بلاک (Breaker Block)', 'Mitigation Block': 'مٹیگیشن بلاک (Mitigation Block)',
 'Rejection Block': 'ریجیکشن بلاک (Rejection Block)',
 'Power of Three': 'پاور آف تھری (Power of Three)',
 'Daily Bias': 'ڈیلی بائس (Daily Bias)', 'Opening Range': 'اوپننگ رینج (Opening Range)',
 'Opening Gap': 'اوپننگ گیپ (Opening Gap)', 'Killzones': 'کِل زونز (Killzones)', 'Killzone': 'کِل زون (Killzone)',
 'Displacement': 'ڈسپلیسمنٹ (Displacement)', 'Leverage': 'لیوریج (Leverage)',
 'Liquidity': 'لیکویڈیٹی (Liquidity)', 'Backtesting': 'بیک ٹیسٹنگ (Backtesting)',
 'Drawdown': 'ڈرا ڈاؤن (Drawdown)', 'Slippage': 'سلیپیج (Slippage)',
 'Stop Loss': 'اسٹاپ لاس (Stop Loss)', 'Stop-Loss': 'اسٹاپ لاس (Stop-Loss)',
 'Take Profit': 'ٹیک پرافٹ (Take Profit)',
 'Trading': 'ٹریڈنگ', 'Trader': 'ٹریڈر', 'Trade': 'ٹریڈ',
 'Execution': 'ایگزیکیوشن (Execution)', 'Entry': 'انٹری (Entry)', 'Entries': 'انٹریز (Entries)',
 'Bullish': 'تیزی والا (Bullish)', 'Bearish': 'مندی والا (Bearish)',
 'Backtest': 'بیک ٹیسٹ (Backtest)', 'Bias': 'بائس (Bias)',
 'Account': 'اکاؤنٹ', 'Position': 'پوزیشن', 'Positions': 'پوزیشنز',
 'Order': 'آرڈر', 'Orders': 'آرڈرز', 'Stop': 'اسٹاپ', 'Stops': 'اسٹاپس',
 'Long': 'لانگ (Long)', 'Short': 'شارٹ (Short)', 'Spread': 'اسپریڈ (Spread)',
 'Free Roam': 'آزادانہ مطالعہ (Free Roam)',
 'LearnSMC': 'LearnSMC', 'Muhammad Umer Ijaz': 'محمد عمر اعجاز',
 'Abdullah Masood': 'عبداللہ مسعود', 'Michael J. Huddleston': 'مائیکل جے ہڈلسٹن',
}
codes = 'ICT SMC PD FVG IFVG OB MSS BOS CHOCH SMT OTE PO3 BSL SSL NFP FOMC CFD CFDs NY ET UTC COT IPDA OHLC VWAP ATR USD XAUUSD NQ ES MNQ MES YMYL SEO GSC HTML RSS SVG PDF API MACD RSI ADR CISD RDRB ATH SL TP BE FX CRT AMD OSOK MMXM RR PNL EQH EQL HRLR LRLR NDOG NWOG NSOG'.split()
for ambiguous in ['Long', 'Short', 'Order', 'Account', 'Stop', 'Stops']: terms.pop(ambiguous, None)
terms.update({'Market Order':'مارکیٹ آرڈر (Market Order)', 'Limit Order':'لِمٹ آرڈر (Limit Order)', 'Stop Order':'اسٹاپ آرڈر (Stop Order)', 'Long Position':'لانگ پوزیشن (Long Position)', 'Short Position':'شارٹ پوزیشن (Short Position)', 'Trading Account':'ٹریڈنگ اکاؤنٹ (Trading Account)'})
protected_terms = ['Execution', 'Entry', 'Leverage', 'Displacement', 'Drawdown', 'Bias', 'LearnSMC', 'Muhammad Umer Ijaz', 'Abdullah Masood']
term_pattern = '|'.join(re.escape(term) for term in sorted(protected_terms, key=len, reverse=True))
code_pattern = '|'.join(re.escape(code) for code in codes)
for code in codes: terms[code] = code
protected = re.compile(r'https?://[^\s<>"\']+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\{\w+\}|\b(?:'+term_pattern+r')\b', re.I)
term_values = {key.lower(): value for key, value in terms.items()}
aliases = [
 ('Fair Value Gaps', r'فیئر ویلیو گیپس', 'فیئر ویلیو گیپس (Fair Value Gaps)'),
 ('Fair Value Gap', r'فیئر ویلیو گیپ', 'فیئر ویلیو گیپ (Fair Value Gap)'),
 ('Order Blocks', r'آرڈر بلاکس', 'آرڈر بلاکس (Order Blocks)'),
 ('Order Block', r'آرڈر بلاک', 'آرڈر بلاک (Order Block)'),
 ('Liquidity Sweeps', r'لیکویڈیٹی سویپس', 'لیکویڈیٹی سویپس (Liquidity Sweeps)'),
 ('Liquidity Sweep', r'لیکویڈیٹی سویپ', 'لیکویڈیٹی سویپ (Liquidity Sweep)'),
 ('Market Structure', r'مارکیٹ (?:اسٹرکچر|سٹرکچر|ساخت)', 'مارکیٹ اسٹرکچر (Market Structure)'),
 ('Liquidity', r'لیکویڈیٹی|لیکوئیڈیٹی', 'لیکویڈیٹی (Liquidity)'),
 ('Stop Loss', r'سٹاپ نقصان|اسٹاپ نقصان|اسٹاپ لاس|سٹاپ لاس', 'اسٹاپ لاس (Stop Loss)'),
 ('Opening Range', r'اوپننگ رینج|اوپننگ رینج', 'اوپننگ رینج (Opening Range)'),
 ('Opening Gap', r'اوپننگ گیپ', 'اوپننگ گیپ (Opening Gap)'),
 ('Backtesting', r'بیک ٹیسٹنگ', 'بیک ٹیسٹنگ (Backtesting)'),
]

def numbers(text):
 text = ''.join(str(unicodedata.digit(c)) if c.isdigit() else c for c in text).replace('−','-').replace('٫','.').replace('٬',',')
 return Counter(Decimal(value.replace(',','')) for value in re.findall(r'(?<!\w)[-+]?(?:\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?|\.\d+)',text))

def terminology(text, source):
 replacements = []
 for english, pattern, replacement in aliases:
  if not re.search(r'\b'+re.escape(english)+r'\b', source, re.I): continue
  def substitute(match):
   replacements.append(replacement); return f'__POSTTERM{len(replacements)-1}__'
  text = re.sub(pattern,substitute,text)
 for index, replacement in enumerate(replacements): text=text.replace(f'__POSTTERM{index}__',replacement)
 return text

def protect(text):
 values = []
 def replace(match):
  original = match.group(0)
  values.append(term_values.get(original.lower(), original))
  return f'ZZTERM{len(values)-1:04d}ZZ'
 return protected.sub(replace, text), values

def restore(text, values, source):
 for index, value in enumerate(values):
  pattern = re.compile(fr'ZZ\s*TERM\s*{index:04d}\s*ZZ', re.I)
  if len(pattern.findall(text)) != 1:
   raise ValueError(f'Protected term {index} missing or duplicated')
  text = pattern.sub(lambda _: value, text)
 if re.search(r'ZZ\s*TERM\s*\d', text, re.I): raise ValueError('Unresolved protected term')
 if numbers(source) != numbers(text): raise ValueError('Numerical content changed; needs manual review')
 return terminology(text.strip(), source)

def split(text):
 if '|' in text:
  result=[]
  for index, line in enumerate(text.split('|')):
   if index: result.append('|')
   result.extend(split(line.strip()))
  return result
 parts = []
 while len(text) > 650:
  candidates = [m.end() for m in re.finditer(r'[.!?]\s+', text[:650]) if m.end() > 180]
  at = candidates[-1] if candidates else text.rfind(' ', 0, 650)
  if at <= 0: at = 650
  parts.append(text[:at].strip()); text = text[at:].strip()
 parts.append(text)
 return parts

items = [item for item in corpus if not item.get('urdu') and item['english'] not in catalog]
cache['|'] = '|'
if args.limit: items = items[:args.limit]
parts_by_source = {item['english']:split(item['english']) for item in items}
pending = []
for item in items:
 for part in split(item['english']):
  if part not in cache: pending.append(part)
pending = list(dict.fromkeys(pending))
print(f'Preparing {len(items)} source segments / {len(pending)} uncached parts.', flush=True)
completed = 0
max_batch = 20
while pending:
 batch, encoded_parts, restorations = [], [], []
 size = 0
 while pending and len(batch) < max_batch:
  text = pending[0]; encoded, values = protect(text)
  wrapped = f'[[[LEARN{len(batch):04d}]]] {encoded}\n'
  if batch and size + len(wrapped) > 2700: break
  pending.pop(0); batch.append(text); encoded_parts.append(wrapped); restorations.append(values); size += len(wrapped)
 payload = ''.join(encoded_parts)
 url = 'https://translate.googleapis.com/translate_a/single?' + urllib.parse.urlencode({'client':'gtx','sl':'en','tl':'ur','dt':'t','q':payload})
 try:
  with urllib.request.urlopen(url, timeout=45) as response: result = json.load(response)
  translated = ''.join(part[0] for part in result[0] if part[0])
  # The response supplies original-source alignment. Use it even when the translator
  # omits a decorative marker from the target; never infer alignment from target order alone.
  aligned = [''] * len(batch); seen = []; current = -1; alignment_ok = True
  for pair in result[0]:
   if not pair[0]: continue
   source_headers = re.findall(r'\[\[\[LEARN(\d{4})\]\]\]', pair[1] or '')
   if len(source_headers) > 1: alignment_ok = False; break
   if source_headers:
    current = int(source_headers[0]); seen.append(current)
   if current < 0 or current >= len(batch): alignment_ok = False; break
   clean = re.sub(r'(?:\[\s*){0,5}LEARN\s*\d{4}(?:\s*\]){0,5}', '', pair[0], flags=re.I)
   aligned[current] += clean
  if not alignment_ok or seen != list(range(len(batch))):
   if len(batch) > 1:
    pending = batch + pending; max_batch = max(1,len(batch)//2)
    print(f'Retrying smaller editorial batches ({max_batch}) to obtain unambiguous source alignment.',flush=True)
    time.sleep(1.2); continue
   aligned = [re.sub(r'(?:\[\s*){0,5}LEARN\s*0000(?:\s*\]){0,5}', '', translated, flags=re.I)]
  for text, value, values in zip(batch, aligned, restorations):
   try:
    cache[text] = restore(value, values, text)
    failures.pop(text, None)
   except ValueError as error: failures[text] = {'error':str(error),'draft':value}
  max_batch = 20
  for source, parts in parts_by_source.items():
   if source not in catalog and all(part in cache for part in parts): catalog[source] = ' '.join(cache[part] for part in parts)
  save_json(cache_path, cache)
  save_json(destination, catalog, newline=True)
  save_json(failures_path, failures)
  completed += len(batch)
  print(f'Draft parts processed: {completed}; source entries saved: {len(catalog)}; pending parts: {len(pending)}; exceptions: {len(failures)}', flush=True)
 except urllib.error.HTTPError as error:
  print(f'Stopped at HTTP {error.code}. Saved work is resumable; no rate-limit bypass.', flush=True)
  raise SystemExit(1)
 except Exception as error:
  (work / 'draft-batch-review.json').write_text(json.dumps({'source':payload,'response':locals().get('translated',''),'error':str(error)},ensure_ascii=False,indent=2),encoding='utf-8')
  print(f'Stopped for review: {error}. Saved work is resumable.', flush=True)
  raise SystemExit(1)
 time.sleep(1.2)
print('Draft preparation completed. Editorial and rendered-page review are still required.', flush=True)
