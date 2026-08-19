const ids = {
  heroGlobalConnect: '1512453979436-5a52c95f9022', 
  corporateHandshake: '1556761175-5973dc0f32b7', 
  berlinCityscape: '1560969184-10fe8719e047', 
  happyCandidate: '1573496359142-b8d87734a5a2', 
  germanVisa: '1555899434-94d1368aa7af', 
  constructionEngineering: '1503387762-592deb58ef4e', 
  healthcareNursing: '1519494026892-80bbd2d6fd0d', 
  agricultureHarvest: '1500382017468-9049fed747ef', 
  logisticsWarehouse: '1586528116311-ad8dd3c8310d', 
  officeCollaboration: '1522071820081-009f0129c71c', 
  openForBusiness: '1497366216548-37526070297c', 
  accommodationApartment: '1522708323590-d24dbb6b0267', 
  airlineFlight: '1436491865461-1cece12e378c', 
  cafeteriaMeal: '1490645935980-d144393bf649', 
  centralEuropeHub: '1474487548417-72840c247305', 
  discoverTalent: '1521737604893-d14cc237f11d', 
  hotelChef: '1577219491135-ce391730fb2c', 
  kairosPrecision: '1495360010541-f48722b34f7d', 
  matchInterview: '1573164713619-24bf7efbf414', 
  paidAnnualLeave: '1507525428034-b723cf961d3e', 
  prepareAssess: '1516321318423-f06f85e504b3', 
  qualityOfLife: '1517457373958-b7bdd4587205', 
  seafoodProcessing: '1583511655857-d19b40a7a54e', 
  softwareDeveloper: '1555066931-4365d14bab8c', 
  strongEconomy: '1486406146926-c627a92ad1ab', 
  transportationBus: '1544620347-19de4f1e428c', 
  truckDriver: '1601584115197-04ecc0da31d7', 
  ukSkilledWorker: '1513635269974-59f9d5efa320', 
  universityCampus: '1541339185-c5ef6101c43f'
};

const https = require('https');

Object.entries(ids).forEach(([key, id]) => {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`;
  https.request(url, { method: 'HEAD' }, (res) => {
    if (res.statusCode !== 200) {
      console.log(`404: ${key} -> ${id}`);
    }
  }).end();
});
