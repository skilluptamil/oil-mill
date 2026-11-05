const fs = require('fs');

// The replacement mapping by file and sequential content image index (0-based among Unsplash images)
const pageReplacements = {
  'index.html': [
    {
      targetId: 'photo-1474979266404-7eaacbcd87c5', // pure golden oil pouring
      alt: 'Traditional Chekku Cold Pressed Oil Extraction Pouring Into Glass Jar'
    },
    {
      targetId: 'photo-1546554137-f86b9593a222', // wooden pestle and mortar
      alt: 'Traditional Vaagai Wooden Chekku Pestle and Mortar Extraction Heritage'
    },
    {
      targetId: 'photo-1567894340315-735d7c361db0', // raw peanuts in shells and kernels
      alt: 'Native Groundnuts and Wood-Pressed Groundnut Oil'
    },
    {
      targetId: 'photo-1508746829417-e6f548d8d6ed', // sesame seeds in wooden bowl
      alt: 'Heirloom Black and White Sesame Seeds with Palm Jaggery'
    },
    {
      targetId: 'photo-1550617931-e17a7b70dce2', // fresh split organic coconuts
      alt: 'Fresh Sun-Dried Coconut Copra and Virgin Cold Pressed Coconut Oil'
    },
    {
      targetId: 'photo-1615485290382-441e4d049cb5', // natural mustard seeds
      alt: 'Pure Mustard Seeds and Pungent Kachi Ghani Mustard Oil'
    },
    {
      targetId: 'photo-1544005313-94ddf0286df2', // woman home chef
      alt: 'Sangeetha Natarajan - Home Chef & Organic Food Advocate'
    },
    {
      targetId: 'photo-1577219491135-ce391730fb2c', // professional chef in kitchen
      alt: 'Chef Arvind Menon - Executive Chef, Heritage Flavors'
    },
    {
      targetId: 'photo-1559839734-2b71ea197ec2', // female doctor / nutritionist
      alt: 'Dr. Rajeshwari K. - Ayurvedic Physician & Nutritionist'
    }
  ],

  'home-2.html': [
    {
      targetId: 'photo-1598965675045-45c5e72c7d05', // peanuts in wooden bowl
      alt: 'Wood-Pressed Groundnut Oil Kernels'
    },
    {
      targetId: 'photo-1515543237350-b3eea1ec8082', // sesame seeds texture
      alt: 'Pure Gingelly Sesame Seeds'
    },
    {
      targetId: 'photo-1584473457406-6240486418e9', // dried coconut copra slices
      alt: 'Pollachi Sun-Dried Coconut Copra'
    },
    {
      targetId: 'photo-1596040033229-a9821ebd058d', // mustard seeds in wooden spoon
      alt: 'Heirloom Yellow Mustard Seeds in Spoon'
    },
    {
      targetId: 'photo-1589301760014-d929f3979dbc', // artisan crafting wood
      alt: 'Artisan Crafting Vaagai Hardwood Pestle for Chekku Mill'
    },
    {
      targetId: 'photo-1555939594-58d7cb561ad1', // cooking with cold pressed oil
      alt: 'Healthy Culinary Cooking with Pure Cold-Pressed Kitchen Oils'
    },
    {
      targetId: 'photo-1540555700478-4be289fbecef', // ayurvedic wellness therapy
      alt: 'Ayurvedic Wellness and Therapeutic Body Massage Oils'
    },
    {
      targetId: 'photo-1526947425960-945c6e72858f', // virgin oil in glass jar
      alt: 'Single-Estate Virgin Cold-Pressed Specialty Oils in Glass'
    },
    {
      targetId: 'photo-1581092160607-ee22621dd758', // laboratory quality testing
      alt: 'Master Miller Inspection and Temperature Batch Audit'
    },
    {
      targetId: 'photo-1586528116311-ad8dd3c8310d', // pristine packaging & bottling
      alt: 'Hygienic Clean Room Bottling and Safe Packaging'
    }
  ],

  'about.html': [
    {
      targetId: 'photo-1510812431401-41d2bd2722f3', // rustic oil cellar with wooden barrels
      alt: 'Heritage Chekku Mill Floor and Timber Ageing Facility'
    },
    {
      targetId: 'photo-1507003211169-0a1dd7228f2d', // founder senior gentleman
      alt: 'K. Periasamy - Founder & Master Miller'
    },
    {
      targetId: 'photo-1573496359142-b8d87734a5a2', // agronomist woman
      alt: 'Dr. Meenakshi Sundaram - Head of Seed Agronomy'
    },
    {
      targetId: 'photo-1500648767791-00dcc994a43e', // operations craftsman
      alt: 'R. Chandran - Master Chekku Craftsman & Mill Operations'
    },
    {
      targetId: 'photo-1534528741775-53994a69daeb', // supply chain executive
      alt: 'Ananya Periasamy - Supply Chain & Sustainable Packaging'
    },
    {
      targetId: 'photo-1567532939604-b6b5b0db2604', // smiling female patron
      alt: 'Lakshmi Ramanathan - Customer since 2012'
    },
    {
      targetId: 'photo-1522075469751-3a6694fb2f61', // organic farmer partner
      alt: 'Vigneshwaran K. - Organic Seed Farmer Partner'
    },
    {
      targetId: 'photo-1506794778202-cad84cf45f1d', // clinic director
      alt: 'Gopalakrishnan S. - Director, Sanjeevani Ayurvedic Clinic'
    }
  ],

  'services.html': [
    {
      targetId: 'photo-1533038590840-1cde6e668a91', // traditional mill press machinery
      alt: 'Commercial Cold-Pressed Chekku Oil Extraction Plant'
    },
    {
      targetId: 'photo-1578749556568-bc2c40e68b61', // traditional stone mortar
      alt: 'Wooden Chekku Custom Seed Milling and Toll Crushing'
    },
    {
      targetId: 'photo-1544816155-12df9643f363', // glass bottles packaging
      alt: 'Hygienic Glass Bottling and Private Label Packaging'
    }
  ],

  'service-details.html': [
    {
      targetId: 'photo-1582515073490-39981397c445', // seed sacks in facility
      alt: 'Chekku Contract Milling Facility Seed Storage and Production'
    }
  ],

  'products.html': [
    {
      targetId: 'photo-1590779033100-9f60a05a013d', // peanuts / groundnuts
      alt: 'Wood-Pressed Groundnut Oil from Native Peanuts'
    },
    {
      targetId: 'photo-1607623814075-e51df1bdc82f', // palm jaggery & sesame
      alt: 'Cold-Pressed Sesame (Gingelly) Oil Crushed with Palm Jaggery'
    },
    {
      targetId: 'photo-1588681664899-f142ff2dc9b1', // coconut meat / copra
      alt: 'Raw Cold-Pressed Virgin Coconut Oil from Pollachi Copra'
    },
    {
      targetId: 'photo-1500382017468-9049fed747ef', // blooming mustard field
      alt: 'Kachi Ghani Cold-Pressed Mustard Oil from Organic Mustard'
    },
    {
      targetId: 'photo-1597848212624-a19eb35e2651', // vibrant sunflower
      alt: 'Cold-Pressed Sunflower Oil from Fresh Sunflower Seeds'
    },
    {
      targetId: 'photo-1608571423902-eed4a5ad8108', // amber dropper bottle
      alt: 'Pure Cold-Pressed Castor Oil in Amber Glass'
    }
  ],

  'process.html': [
    {
      targetId: 'photo-1574943320219-553eb213f72d', // hands inspecting seeds
      alt: 'Inspection and Selection of Heirloom Native Seeds'
    },
    {
      targetId: 'photo-1509358271058-acd22cc93898', // sun drying seeds
      alt: 'Traditional Sun Drying and Dust Sieving of Seeds'
    },
    {
      targetId: 'photo-1606851094655-b2593a9af63f', // artisan wood press
      alt: 'Traditional Vaagai Hardwood Chekku Pestle Crushing under 42°C'
    },
    {
      targetId: 'photo-1584308666744-24d5c474f2ae', // clear oil settling in glass
      alt: 'Natural Sun Sedimentation and Gentle Gravity Settling'
    },
    {
      targetId: 'photo-1576086213369-97a306d36557', // laboratory pipette purity test
      alt: 'Multi-Layer Cotton Cloth Filtration and Quality Lab Testing'
    },
    {
      targetId: 'photo-1556228720-195a672e8a03', // amber bottles
      alt: 'UV-Protected Dark Glass Bottling and Hermetic Sealing'
    }
  ],

  'blog.html': [
    {
      targetId: 'photo-1513836279014-a89f7a76ae86', // wood tree rings
      alt: 'Vaagai Hardwood Timber Structure and Growth Rings'
    },
    {
      targetId: 'photo-1537368910025-700350fe46c7', // author avatar
      alt: 'K. Periasamy'
    },
    {
      targetId: 'photo-1532187863486-abf9dbad1b69', // lab solvents
      alt: 'Chemical Solvents vs Traditional Mechanical Cold-Pressing'
    },
    {
      targetId: 'photo-1599785209707-a456fc1337bb', // jaggery block
      alt: 'Organic Palm Jaggery (Karupatti) Used in Sesame Extraction'
    },
    {
      targetId: 'photo-1556910103-1c02745aae4d', // frying pan
      alt: 'Deep Frying at High Heat in Cold-Pressed Groundnut Oil'
    },
    {
      targetId: 'photo-1483921020237-2ff51e8e4b22', // crystal cold frost
      alt: 'Cold Solidification Refrigerator Test for Coconut Oil Purity'
    },
    {
      targetId: 'photo-1520072959219-c595dc870360', // wood timber texture
      alt: 'Why Vaagai Wood is Best for Traditional Chekku'
    },
    {
      targetId: 'photo-1582719478250-c89cae4dc85b', // test tubes
      alt: 'Chemical Solvents and Hexane in Refined Oil'
    },
    {
      targetId: 'photo-1588776814546-1ffcf47267a5', // healthy smile wellness
      alt: 'Traditional Gingelly Oil Pulling for Oral Health'
    }
  ],

  'blog-details.html': [
    {
      targetId: 'photo-1501196354995-cbb51c65aaea', // author avatar
      alt: 'K. Periasamy'
    },
    {
      targetId: 'photo-1518531933037-91b2f5f229cc', // sacred timber trees
      alt: 'Albizia Lebbeck (Vaagai) Sacred Timber Pestle in Granite Mortar'
    },
    {
      targetId: 'photo-1519710164239-da123dc03ef4', // handcrafted wooden tools
      alt: 'Natural Wood Grain Thermodynamics Absorbing Crushing Friction'
    },
    {
      targetId: 'photo-1627483262268-9c2b5b2834b5', // golden oil stream
      alt: 'Golden Cold-Pressed Oil Streaming from Wood Chekku'
    },
    {
      targetId: 'photo-1606811841689-23dfddce3e95', // ayurvedic seeds & herbs
      alt: 'Traditional Sesame Seeds and Palm Jaggery Synergy'
    },
    {
      targetId: 'photo-1589302168068-964664d93dc0', // cast iron cooking
      alt: 'Traditional Deep Frying in Pure Wood-Pressed Groundnut Oil'
    },
    {
      targetId: 'photo-1519085360753-af0119f7cbe7', // author bio avatar
      alt: 'K. Periasamy - Master Miller & Traditional Oil Advocate'
    },
    {
      targetId: 'photo-1518152006812-edab29b069ac', // pipette chemical solution
      alt: 'Chemical Solvents vs Natural Mechanical Chekku Pressing'
    },
    {
      targetId: 'photo-1506126613408-eca07ce68773', // morning wellness yoga
      alt: 'Daily Morning Oil Pulling Rituals with Pure Sesame Oil'
    }
  ],

  'dashboard.html': [
    {
      targetId: 'photo-1472099645785-5658abf4ff4e', // admin avatar
      alt: 'Admin Profile Avatar'
    }
  ]
};

// Apply to HTML files
Object.entries(pageReplacements).forEach(([file, list]) => {
  let content = fs.readFileSync(file, 'utf8');

  // Match all Unsplash <img> tags in the file
  let matchIndex = 0;
  content = content.replace(/<img([^>]+)src=["']https:\/\/images\.unsplash\.com\/([^"'\?]+)([^"']*)["']([^>]*)>/gi, (fullTag, beforeSrc, oldId, query, afterSrc) => {
    if (matchIndex >= list.length) {
      console.warn(`Warning: More Unsplash images found in ${file} than in replacement list (index ${matchIndex})`);
      return fullTag;
    }
    const repl = list[matchIndex];
    matchIndex++;

    // Replace id in query
    const newSrc = `https://images.unsplash.com/${repl.targetId}${query}`;

    // Combine beforeSrc and afterSrc to update alt attribute if present
    let combinedAttrs = beforeSrc + afterSrc;
    if (repl.alt) {
      if (/alt=["'][^"']*["']/i.test(combinedAttrs)) {
        combinedAttrs = combinedAttrs.replace(/alt=["'][^"']*["']/i, `alt="${repl.alt}"`);
      } else {
        combinedAttrs += ` alt="${repl.alt}"`;
      }
    }

    return `<img${beforeSrc}src="${newSrc}"${afterSrc}>`.replace(/alt=["'][^"']*["']/i, `alt="${repl.alt}"`);
  });

  if (matchIndex !== list.length) {
    console.error(`ERROR in ${file}: Expected ${list.length} replacements, but replaced ${matchIndex}!`);
  } else {
    console.log(`Updated ${file}: ${matchIndex} images replaced successfully.`);
  }

  fs.writeFileSync(file, content, 'utf8');
});

// Update CSS files
// 1. css/style.css:
let styleCss = fs.readFileSync('css/style.css', 'utf8');

// Replace .hero-home-2 background
// Line 742: url('https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1920&q=80')
styleCss = styleCss.replace(
  /(\.hero-home-2::after\s*\{[^}]*url\(['"]https:\/\/images\.unsplash\.com\/)(photo-[^"'\?]+)(\?[^'"]+['"]\))/s,
  `$1photo-1470240731273-7821a6eeb6bd$3`
);

// Replace .page-banner background
// Line 832: url('https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1920&q=80')
styleCss = styleCss.replace(
  /(\.page-banner\s*\{[^}]*url\(['"]https:\/\/images\.unsplash\.com\/)(photo-[^"'\?]+)(\?[^'"]+['"]\))/s,
  `$1photo-1518568814500-bf0f8d125f46$3`
);

fs.writeFileSync('css/style.css', styleCss, 'utf8');
console.log('Updated css/style.css backgrounds successfully.');

console.log('\nAll updates applied successfully!');

