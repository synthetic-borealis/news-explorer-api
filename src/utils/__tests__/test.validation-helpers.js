const {
  isValidEmail,
  isValidURL,
} = require('../validation-helpers');

const validEmail = 'gordon.freeman@blackmesa.com';
const invalidEmail = 'gordon.freeman#blackmesa.com';
const blacklistedEmail = 'gordon.freeman@sharklasers.com';
const httpUrl = 'http://www.nytimes.com/2021/12/07/magazine/tv-for-cats.html';
const httpsUrl = 'https://www.nytimes.com/2021/12/07/magazine/tv-for-cats.html';
const ftpUrl = 'ftp://ftp.gnu.org';
const invalidUrl = 'www.catfacts.com';

describe('Validation helper tests', () => {
  describe('isValidEmail tests', () => {
    it('Accepts valid e-mail addresses', () => {
      expect(isValidEmail(validEmail)).toBeTruthy();
    });

    it('Rejects invalid e-mail addresses', () => {
      expect(isValidEmail(invalidEmail)).toBeFalsy();
    });

    it('Rejects blacklisted e-mail addresses', () => {
      expect(isValidEmail(blacklistedEmail)).toBeFalsy();
    });
  });

  describe('isValidUrl tests', () => {
    it('Accepts http URLs', () => {
      expect(isValidURL(httpUrl)).toBeTruthy();
    });

    it('Accepts https URLs', () => {
      expect(isValidURL(httpsUrl)).toBeTruthy();
    });

    it('Rejects non http/https URLs', () => {
      expect(isValidURL(ftpUrl)).toBeFalsy();
    });

    it('Rejects invalid URLs', () => {
      expect(isValidURL(invalidUrl)).toBeFalsy();
    });
  });
});
