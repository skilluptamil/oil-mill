const https = require('https');
const fs = require('fs');

const masterList = {
  // --- index.html (Home 1) ---
  home1_hero_card: 'photo-1474979266404-7eaacbcd87c5',
  home1_about: 'photo-1546554137-f86b9593a222',
  home1_prod_groundnut: 'photo-1567894340315-735d7c361db0',
  home1_prod_sesame: 'photo-1508746829417-e6f548d8d6ed',
  home1_prod_coconut: 'photo-1550617931-e17a7b70dce2',
  home1_prod_mustard: 'photo-1615485290382-441e4d049cb5',
  home1_testi_sangeetha: 'photo-1544005313-94ddf0286df2',
  home1_testi_arvind: 'photo-1577219491135-ce391730fb2c',
  home1_testi_rajeshwari: 'photo-1559839734-2b71ea197ec2',

  // --- home-2.html (Home 2) ---
  home2_float_groundnut: 'photo-1598965675045-45c5e72c7d05',
  home2_float_sesame: 'photo-1515543237350-b3eea1ec8082',
  home2_float_coconut: 'photo-1584473457406-6240486418e9',
  home2_float_mustard: 'photo-1596040033229-a9821ebd058d',
  home2_speciality_pestle: 'photo-1589301760014-d929f3979dbc',
  home2_collection_kitchen: 'photo-1555939594-58d7cb561ad1',
  home2_collection_ayurvedic: 'photo-1540555700478-4be289fbecef',
  home2_collection_virgin: 'photo-1526947425960-945c6e72858f',
  home2_quality_miller: 'photo-1581092160607-ee22621dd758',
  home2_quality_bottling: 'photo-1586528116311-ad8dd3c8310d',

  // --- about.html ---
  about_facility: 'photo-1510812431401-41d2bd2722f3',
  about_team_periasamy: 'photo-1507003211169-0a1dd7228f2d',
  about_team_meenakshi: 'photo-1573496359142-b8d87734a5a2',
  about_team_chandran: 'photo-1500648767791-00dcc994a43e',
  about_team_ananya: 'photo-1534528741775-53994a69daeb',
  about_testi_lakshmi: 'photo-1567532939604-b6b5b0db2604',
  about_testi_vigneshwaran: 'photo-1522075469751-3a6694fb2f61',
  about_testi_gopalakrishnan: 'photo-1506794778202-cad84cf45f1d',

  // --- services.html ---
  services_commercial: 'photo-1533038590840-1cde6e668a91',
  services_chekku_milling: 'photo-1578749556568-bc2c40e68b61',
  services_bottling_custom: 'photo-1544816155-12df9643f363',

  // --- service-details.html ---
  service_detail_facility: 'photo-1582515073490-39981397c445',

  // --- products.html ---
  products_groundnut: 'photo-1590779033100-9f60a05a013d',
  products_sesame: 'photo-1607623814075-e51df1bdc82f',
  products_coconut: 'photo-1588681664899-f142ff2dc9b1',
  products_mustard: 'photo-1500382017468-9049fed747ef',
  products_sunflower: 'photo-1597848212624-a19eb35e2651',
  products_castor: 'photo-1608571423902-eed4a5ad8108',

  // --- process.html ---
  process_seed_selection: 'photo-1574943320219-553eb213f72d',
  process_cleaning_drying: 'photo-1509358271058-acd22cc93898',
  process_wood_extraction: 'photo-1606851094655-b2593a9af63f',
  process_sedimentation: 'photo-1584308666744-24d5c474f2ae',
  process_filtration_lab: 'photo-1576086213369-97a306d36557',
  process_bottling_uv: 'photo-1556228720-195a672e8a03',

  // --- blog.html ---
  blog_featured_wood: 'photo-1513836279014-a89f7a76ae86',
  blog_author_avatar: 'photo-1537368910025-700350fe46c7',
  blog_card_solvents: 'photo-1532187863486-abf9dbad1b69',
  blog_card_jaggery: 'photo-1599785209707-a456fc1337bb',
  blog_card_frying: 'photo-1556910103-1c02745aae4d',
  blog_card_refrigerator: 'photo-1483921020237-2ff51e8e4b22',
  blog_thumb_wood: 'photo-1520072959219-c595dc870360',
  blog_thumb_solvent: 'photo-1582719478250-c89cae4dc85b',
  blog_thumb_pulling: 'photo-1588776814546-1ffcf47267a5',

  // --- blog-details.html ---
  blog_detail_author: 'photo-1537368910025-700350fe46c7', // author
  blog_detail_hero: 'photo-1518531933037-91b2f5f229cc',
  blog_detail_wood_thermo: 'photo-1519710164239-da123dc03ef4',
  blog_detail_oil_stream: 'photo-1627483262268-9c2b5b2834b5',
  blog_detail_related_sesame: 'photo-1606811841689-23dfddce3e95',
  blog_detail_related_heat: 'photo-1589302168068-964664d93dc0',
  blog_detail_bio_author: 'photo-1537368910025-700350fe46c7', // author
  blog_detail_recent_solvents: 'photo-1518152006812-edab29b069ac',
  blog_detail_recent_rituals: 'photo-1506126613408-eca07ce68773',

  // --- dashboard.html ---
  dashboard_admin_avatar: 'photo-1472099645785-5658abf4ff4e',

  // --- CSS Backgrounds ---
  css_hero_home2: 'photo-1470240731273-7821a6eeb6bd',
  css_page_banner: 'photo-1518568814500-bf0f8d125f46'
};

const entries = Object.entries(masterList);
let done = 0;
const results = { pass: 0, fail: 0 };
const failed = [];

entries.forEach(([key, id]) => {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode === 200) {
      results.pass++;
    } else {
      results.fail++;
      failed.push({ key, id, code: res.statusCode });
      console.log(`FAIL [${res.statusCode}]: ${key} (${id})`);
    }
    done++;
    if (done === entries.length) {
      console.log(`\nVerification Complete! Pass: ${results.pass}, Fail: ${results.fail}`);
      if (failed.length > 0) {
        console.log('Failed items:', failed);
      } else {
        console.log('ALL CANDIDATES RETURNED HTTP 200 OK!');
        fs.writeFileSync('scratch/master_image_map.json', JSON.stringify(masterList, null, 2), 'utf8');
      }
    }
  }).on('error', (e) => {
    results.fail++;
    failed.push({ key, id, error: e.message });
    done++;
  });
});

