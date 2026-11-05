const https = require('https');

// A list of high quality Unsplash photos for each category
const candidates = {
  // --- PEANUT / GROUNDNUT ---
  peanut_seed: 'photo-1567894340315-735d7c361db0', // raw peanuts in shells and kernels
  peanut_oil: 'photo-1620706857471-20926838a5b2', // peanut oil with peanuts
  peanut_bowl: 'photo-1598965675045-45c5e72c7d05', // roasted groundnuts in wooden bowl
  peanut_harvest: 'photo-1582515073490-39981397c445', // peanuts harvest
  peanut_cooking: 'photo-1555939594-58d7cb561ad1', // cooking with peanut oil in wok

  // --- SESAME / GINGELLY ---
  sesame_seeds: 'photo-1508746829417-e6f548d8d6ed', // sesame seeds in bowl
  sesame_black_white: 'photo-1515543237350-b3eea1ec8082', // sesame seed textures
  sesame_oil_glass: 'photo-1547517023-7ca0c162f816', // sesame oil bottle
  sesame_jaggery: 'photo-1607623814075-e51df1bdc82f', // palm jaggery / raw cane jaggery
  sesame_wellness: 'photo-1540555700478-4be289fbecef', // ayurvedic oil wellness / massage

  // --- COCONUT ---
  coconut_halves: 'photo-1550617931-e17a7b70dce2', // fresh coconut split open
  coconut_copra: 'photo-1584473457406-6240486418e9', // coconut slices copra
  coconut_oil_jar: 'photo-1526947425960-945c6e72858f', // virgin coconut oil glass jar
  coconut_tree_farm: 'photo-1516253593875-bd7ba052fbc5', // coconut plantation Pollachi
  coconut_solidified: 'photo-1588681664899-f142ff2dc9b1', // coconut organic texture

  // --- MUSTARD ---
  mustard_seeds: 'photo-1615485290382-441e4d049cb5', // yellow and black mustard seeds
  mustard_field: 'photo-1500382017468-9049fed747ef', // blooming mustard flower field
  mustard_oil_bottle: 'photo-1627483262268-9c2b5b2834b5', // golden oil bottle
  mustard_seeds_spoon: 'photo-1596040033229-a9821ebd058d', // mustard seeds in wooden spoon

  // --- SUNFLOWER ---
  sunflower_blossom: 'photo-1597848212624-a19eb35e2651', // bright sunflower
  sunflower_seeds: 'photo-1518568814500-bf0f8d125f46', // sunflower seeds
  sunflower_oil_pour: 'photo-1474979266404-7eaacbcd87c5', // golden oil pouring
  sunflower_field: 'photo-1470240731273-7821a6eeb6bd', // sunflower farm landscape

  // --- CASTOR / WELLNESS ---
  castor_dropper: 'photo-1608571423902-eed4a5ad8108', // amber dropper cosmetic oil bottle
  castor_plant: 'photo-1518531933037-91b2f5f229cc', // lush castor / botanical leaves
  castor_amber_bottles: 'photo-1556228720-195a672e8a03', // apothecary amber oil bottles
  ayurvedic_herbs: 'photo-1617897903246-719242758050', // ayurvedic herbs and oil

  // --- WOODEN CHEKKU / TRADITIONAL MILL ---
  wood_pestle_mortar: 'photo-1546554137-f86b9593a222', // mortar and pestle
  wooden_press_artisan: 'photo-1589301760014-d929f3979dbc', // wood craftsmanship
  traditional_press: 'photo-1533038590840-1cde6e668a91', // traditional rustic mill machinery
  oil_mill_barrels: 'photo-1510812431401-41d2bd2722f3', // rustic wooden barrels / oil cellar
  stone_mortar: 'photo-1578749556568-bc2c40e68b61', // traditional stone mortar
  chekkumill_hall: 'photo-1581092160607-ee22621dd758', // clean production workshop

  // --- SEED SELECTION & PROCESSING ---
  seed_selection_hands: 'photo-1574943320219-553eb213f72d', // hands holding raw organic seeds
  sun_drying_grains: 'photo-1509358271058-acd22cc93898', // grains sun drying outdoors
  seed_cleaning_sieve: 'photo-1542838132-92c53300491e', // farmer sorting / cleaning grains
  cotton_filtration: 'photo-1576086213369-97a306d36557', // lab testing / pipette purity analysis
  oil_settling_tanks: 'photo-1584308666744-24d5c474f2ae', // pure clear liquid in glass settling vessel
  bottling_conveyor: 'photo-1586528116311-ad8dd3c8310d', // modern packaging and shipping boxes
  packaging_glass: 'photo-1584308666744-24d5c474f2ae', // glass jars packaging

  // --- HERO & BANNER ATMOSPHERE ---
  hero_chekkuhome1: 'photo-1474979266404-7eaacbcd87c5', // classic deep olive oil lighting
  hero_chekkuhome2: 'photo-1509358271058-acd22cc93898', // golden sun agricultural setting
  banner_farm: 'photo-1500382017468-9049fed747ef', // lush rural farmlands
  banner_wood_seeds: 'photo-1518568814500-bf0f8d125f46', // natural seeds texture

  // --- PORTRAITS (TEAM & TESTIMONIALS - ALL UNIQUE) ---
  team_founder: 'photo-1507003211169-0a1dd7228f2d', // senior man
  team_botanist: 'photo-1573496359142-b8d87734a5a2', // professional woman scientist
  team_operations: 'photo-1500648767791-00dcc994a43e', // senior man operations
  team_sustainability: 'photo-1534528741775-53994a69daeb', // young woman sustainability
  testi_chef: 'photo-1577219491135-ce391730fb2c', // professional chef in kitchen
  testi_physician: 'photo-1559839734-2b71ea197ec2', // doctor / nutritionist woman
  testi_homechef: 'photo-1544005313-94ddf0286df2', // woman home chef
  testi_farmer: 'photo-1522075469751-3a6694fb2f61', // man farmer partner
  testi_clinic: 'photo-1506794778202-cad84cf45f1d', // wellness clinic director
  admin_avatar: 'photo-1472099645785-5658abf4ff4e', // admin man avatar

  // --- BLOG TOPICS ---
  blog_wood_science: 'photo-1513836279014-a89f7a76ae86', // timber tree / wood rings
  blog_solvent_truth: 'photo-1532187863486-abf9dbad1b69', // chemistry / laboratory solvents
  blog_jaggery_sesame: 'photo-1599785209707-a456fc1337bb', // traditional sweets / jaggery
  blog_frying_pan: 'photo-1556910103-1c02745aae4d', // frying pan sizzle cooking
  blog_freezing_test: 'photo-1483921020237-2ff51e8e4b22', // winter snow / ice freezing crystal
  blog_oil_pulling: 'photo-1512290903422-92a106f20b35' // clean oral wellness / smile
};

function checkAll() {
  const entries = Object.entries(candidates);
  let done = 0;
  const verified = {};

  entries.forEach(([key, id]) => {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 200) {
        verified[key] = id;
      } else {
        console.log(`FAILED ${key}: ${res.statusCode} (${id})`);
      }
      done++;
      if (done === entries.length) {
        console.log(`\nVerified ${Object.keys(verified).length} of ${entries.length} candidate images.`);
        fs.writeFileSync('scratch/verified_candidates.json', JSON.stringify(verified, null, 2), 'utf8');
      }
    }).on('error', (e) => {
      console.log(`ERROR ${key}: ${e.message}`);
      done++;
    });
  });
}

checkAll();

