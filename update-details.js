const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'contact.html', 'generate-pages.js'];

// Replacement maps
const oldPhoneVariants = [
    { old: '+919392901664', new: '+919949350392' },
    { old: '+91 93929 01664', new: '+91 99493 50392' },
    { old: '919392901664', new: '919949350392' },
    { old: '9392901664', new: '9949350392' }
];

const oldAddr1 = '1_4_27/71/2, Padmashali Colony, Indira Nagar, Kavadiguda, Hyderabad, Telangana 500080';
const newAddr1 = 'Smart Backside, Plot 2, RBI Colony, Phase 2, Kavuri Hills, Madhapur, Hyderabad, Telangana 500081';

const oldAddr2 = 'Padmashali Colony, Kavadiguda, Hyderabad 500080';
const newAddr2 = 'Smart Backside, Plot 2, RBI Colony, Madhapur, Hyderabad 500081';

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Phones
        oldPhoneVariants.forEach(v => {
            content = content.split(v.old).join(v.new);
        });

        // Addresses
        content = content.split(oldAddr1).join(newAddr1);
        content = content.split(oldAddr2).join(newAddr2);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
