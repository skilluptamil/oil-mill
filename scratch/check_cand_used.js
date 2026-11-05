const fs = require('fs');

const report = JSON.parse(fs.readFileSync('scratch/final_audit_report.json', 'utf8'));
const usedIds = new Set(Object.keys(report.occurrences));

console.log('photo-1596040033229-a9821ebd058d used?', usedIds.has('photo-1596040033229-a9821ebd058d'));
console.log('photo-1589302168068-964664d93dc0 used?', usedIds.has('photo-1589302168068-964664d93dc0'));
console.log('photo-1518152006812-edab29b069ac used?', usedIds.has('photo-1518152006812-edab29b069ac'));

