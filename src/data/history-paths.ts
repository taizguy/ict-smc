/** English-first editorial release. Add translations only after review. */
export const englishOnlyHistoryPaths = [
  "/articles/history/",
  "/articles/before-money-gifts-sharing-and-trust/",
  "/articles/barter-direct-exchange-and-its-limits/",
  "/articles/stone-age-long-distance-trade-networks/",
  "/articles/commodity-money-cattle-grain-salt-shells-beads/",
  "/articles/mesopotamia-tokens-temples-first-accounting/",
  "/articles/egypt-indus-grain-weights-seals/",
  "/articles/silver-gold-by-weight-before-coins/",
  "/articles/lydia-first-coins-electrum-croesus/",
  "/articles/greek-city-states-coins-agora-bankers/",
  "/articles/persia-alexander-empire-wide-currency/",
  "/articles/ancient-china-knife-spade-round-coins/",
  "/articles/rome-denarius-debasement-inflation/",
  "/articles/ancient-credit-contracts-loans-interest-banking/",
  "/articles/silk-road-indian-ocean-trade/",
  "/articles/medieval-money-islamic-coins-hawala-bills/",
  "/articles/paper-money-tang-song-china-flying-money/",
  "/articles/first-stock-markets-venice-voc-amsterdam/",
  "/articles/banknotes-central-banks-stockholm-bank-england/",
  "/articles/gold-standard-bretton-woods-1971/",
  "/articles/trading-floors-order-books-electronic-markets/"
] as readonly string[];
export function isEnglishOnlyHistory(path:string){return englishOnlyHistoryPaths.includes(path.replace(/^\/ur(?=\/)/,'').replace(/\/?$/,'/'));}
