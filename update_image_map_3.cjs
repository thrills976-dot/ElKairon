const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'imageMap.ts');
let content = fs.readFileSync(filePath, 'utf8');

const importsToAdd = `
import officeCollaborationImg from '../assets/images/office_collaboration_1787072239484.jpg';
import openForBusinessImg from '../assets/images/open_for_business_1787072251104.jpg';
import accommodationApartmentImg from '../assets/images/accommodation_apartment_1787072264325.jpg';
`;

// Insert the imports right before 'export const BACKGROUND_IMAGES'
content = content.replace('export const BACKGROUND_IMAGES = {', importsToAdd + '\nexport const BACKGROUND_IMAGES = {');

content = content.replace(
  "officeCollaboration: 'https://loremflickr.com/1200/800/office,collaboration/all',",
  "officeCollaboration: officeCollaborationImg,"
);

content = content.replace(
  "openForBusiness: 'https://loremflickr.com/1200/800/modern,office,building/all',",
  "openForBusiness: openForBusinessImg,"
);

content = content.replace(
  "accommodationApartment: 'https://loremflickr.com/1200/800/apartment,livingroom/all',",
  "accommodationApartment: accommodationApartmentImg,"
);

fs.writeFileSync(filePath, content);
console.log("Updated 3 images.");
