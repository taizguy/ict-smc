export const authorContact = {
  email: 'itsmuhammadumerijaz@gmail.com',
  telephone: '+923424009627',
  streetAddress: 'Gullistan Villas near Pasrur bypass',
  addressLocality: 'Daska',
  addressCountry: 'PK',
};

export const publisher = {
  '@type': 'Organization',
  '@id': 'https://learnsmc.xyz/#organization',
  name: 'LearnSMC',
  url: 'https://learnsmc.xyz/',
};

export const lessonAuthor = {
  '@type': 'Person',
  '@id': 'https://learnsmc.xyz/about/#author',
  name: 'Muhammad Umer Ijaz',
  url: 'https://learnsmc.xyz/about/',
  email: authorContact.email,
  telephone: authorContact.telephone,
  address: { '@type': 'PostalAddress', streetAddress: authorContact.streetAddress, addressLocality: authorContact.addressLocality, addressCountry: authorContact.addressCountry },
};

export const financialDisclaimer = 'For education only, not personal investment advice or a recommendation to buy or sell. Trading forex, futures, CFDs and other leveraged products can result in substantial losses, including losses beyond your deposit where applicable. Examples and simulations do not predict future results. Test ideas in a demo account, consider your circumstances and seek qualified advice when needed.';
