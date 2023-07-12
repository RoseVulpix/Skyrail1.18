//TODO
//Fix Pressure Plates
const GroupTypes = {
	Prefix: 0,
	Postfix: 1,
	Fuzzy: 2
}
onEvent("rei.group", (event) => {
	function makeGroupedByTag(namespace, list) {
		list.forEach((type) => {
			//This step is necessary because javascript will try to dig into the string otherwise
			var tag = `${namespace}:${type}`
			event.groupItemsByTag(
				`${namespace}:rei_groups/${type}`,
				`${(type)}`,
				tag
			);
		});
	}

	function makeGroupedByRegex(namespace, list, regexType) {
		list.forEach((type) => {
			var regString = `${namespace}:`;
			if (regexType == GroupTypes.Prefix || regexType == GroupTypes.Fuzzy) {
				regString += `.*`
			}
			regString += type
			if (regexType == GroupTypes.Postfix || regexType == GroupTypes.Fuzzy) {
				regString += `.*`
			}
			else {regString += `$`}
			var regex = new RegExp(regString)
			event.groupItems(
				`${namespace}:rei_groups/${type}`,
				`${(type)}s`,
				regex
			)
		})
	}

	function makeGroupedByComplexList(namespace, blockType, blockColor, regexType) {
		blockColor.forEach(color => {
			let complexList = []
			blockType.forEach(type => {
				complexList.push(type.replace("X", color))
			})
			makeGroupedByRegex(namespace, complexList, regexType)
		})
	}

	/*function toMultiTitleCase(str) {
		var result
		str.split("_").forEach((type) => {
			result = type.charAt(0).toUpperCase()
		})
	}*/

    const useNbt = [
        "potion",
        "enchanted_book",
        "splash_potion",
        "tipped_arrow",
        "lingering_potion",
        "quark:seed_pouch",
		"quark:ancient_tome",
		"tconstruct:modifier_worktable",
        "tconstruct:modifier_crystal",
        "tconstruct:crafting_station",
        "tconstruct:tinker_station",
        "tconstruct:part_builder",
        "tconstruct:tinkers_anvil",
        "tconstruct:scorched_anvil",
        "tconstruct:potion_bucket",
    	"tconstruct:repair_kit",
    	"tconstruct:pick_head",
    	"tconstruct:hammer_head",
    	"tconstruct:small_axe_head",
    	"tconstruct:broad_axe_head",
    	"tconstruct:small_blade",
    	"tconstruct:broad_blade",
    	"tconstruct:round_plate",
    	"tconstruct:large_plate",
    	"tconstruct:tool_binding",
    	"tconstruct:tool_handle",
    	"tconstruct:tough_handle",
    	"tconstruct:pickaxe",
    	"tconstruct:sledge_hammer",
    	"tconstruct:vein_hammer",
    	"tconstruct:mattock",
		"tconstruct:pickadze",
		"tconstruct:excavator",
		"tconstruct:hand_axe",
		"tconstruct:broad_axe",
		"tconstruct:kama",
		"tconstruct:scythe",
		"tconstruct:dagger",
		"tconstruct:sword",
		"tconstruct:cleaver",
		"tconstruct:crossbow",
		"tconstruct:longbow",
		"tconstruct:bow_limb",
		"tconstruct:bow_grip",
		"tconstruct:bowstring",
		"tconstruct:seared_drain",
		"tconstruct:seared_duct",
		"tconstruct:seared_chute",
		"tconstruct:scorched_drain",
		"tconstruct:scorched_duct",
		"tconstruct:scorched_chute",
		"tconstruct:smeltery_controller",
		"tconstruct:foundry_controller",
		"bloodmagic:upgradetome",
		"botania:blood_pendant",
		"botania:brew_vial",
		"botania:brew_flask",
		"botania:incense_stick",
		"botania:terra_pick",
		"botania:flight_tiara",
		"botania:laputa_shard",
		"botania:twig_wand",
		"botania:dreamwood_wand"
    ];

	useNbt.forEach((id) => {
		const item = Item.of(id);
		const { namespace, path } = Utils.id(item.id);
		event.groupSameItem(
			`${namespace}:rei_groups/${path}`,
			item.getName(),
			item
		);
	});

	//MC
	let mcPrefixBlocks = [
		"wool",
		"carpet",
		"bed",
		"concrete",
		"concrete_powder",
		"coral_block",
		"coral",
		"coral_fan",
		"glazed_terracotta",
		"shulker_box",
		"sapling",
		"copper_ore",
		"iron_ore",
		"coal_ore",
		"gold_ore",
		"redstone_ore",
		"emerald_ore",
		"lapis_ore",
		"diamond_ore",
		"sand",
		"sandstone",
		"sponge",
		"copper",
		"anvil"
	];
	makeGroupedByRegex("minecraft", mcPrefixBlocks, GroupTypes.Prefix)
	let mcTagBlocks = [
		"slabs",
		"stairs",
		"leaves",
		"logs",
		"music_discs",
		"terracotta",
		"buttons",
		"doors",
		"trapdoors",
		"boats",
		"signs",
		"banners",
		"candles",
		"walls",
		"planks"
	]
	makeGroupedByTag("minecraft", mcTagBlocks)

	//Forge
	let forgeTagBlocks = [
		"fences",
		"chests/wooden",
		"dyes",
		"fence_gates",
		"stained_glass",
		"stained_glass_panes",
		"bookshelves"
	]
	makeGroupedByTag("forge", forgeTagBlocks)

	event.groupItems("minecraft:rei_groups/pressure_plate", "Pressure Plates", [
		/minecraft:.*pressure_plate/,
		/quark:.*pressure_plate/,
		/tconstruct:.*pressure_plate/,
		/ars_nouveau:.*pressure_plate/
	])

	//Quark
	let quarkTagBlocks = [
		"runes",
		"hedges",
		"ladders",
		"shards",
		"corundum"
	]
	makeGroupedByTag("quark",quarkTagBlocks)
	let quarkRegexBlocks = [
		"post",
		"shingles",
		"corundum_cluster",
		"corundum_pane",
		"carpet",
		"framed_glass",
		"framed_glass_pane",
		"vertical_slab"
	]
	makeGroupedByRegex("quark", quarkRegexBlocks, GroupTypes.Prefix)
	event.groupItems(
		"quark:rei_groups/waxed_corundum",
		"Waxed Corundum",
		/quark:waxed.*/
	)
	event.groupItems(
		"quark:rei_groups/vertical_planks",
		"Vertical Planks",
		/quark:vertical_.*_planks/
	)

	//Create
	let createRegexBlocks = [
		"valve_handle",
		"seat",
		"toolbox",
		"window",
		"glass_pane",
		"window_pane"
	]
	makeGroupedByRegex("create", createRegexBlocks, GroupTypes.Prefix)
	createRegexBlocks = [
		"crushed"
	]
	makeGroupedByRegex("create", createRegexBlocks, GroupTypes.Postfix)
	let cafeRegexBlocks = [
		"milk_tea"
	]
	makeGroupedByRegex("createcafe", cafeRegexBlocks, GroupTypes.Prefix)
	event.groupFluids(
		`createcafe:rei_groups/milk_tea`,
		"Milk Tea!",
		Ku.Fluids.getFluidsByNamespace("createcafe").toArray()
	)
	makeGroupedByTag("railways", ["conductor_caps"])
	makeGroupedByRegex("railways", ["track"], GroupTypes.Postfix)
	event.groupItems(
		"extendedgears:rei_groups/cogwheels",
		"Cogwheels",
		"#extendedgears:cogwheel"
	)
	event.groupItems(
		"create_crystal_clear:rei_groups/glass_casings",
		"Glass Casings",
		/create_crystal_clear:.*/
	)
	let createFuzzyBlocks = [
		"granite",
		"diorite",
		"andesite",
		"calcite",
		"dripstone",
		"deepslate",
		"tuff",
		"asurine",
		"crimsite",
		"limestone",
		"ochrum",
		"scoria",
		"scorchia",
		"veridium",
		"copper_shingle",
		"copper_tile"
	]
	makeGroupedByRegex("create", createFuzzyBlocks, GroupTypes.Fuzzy)
	let createDecoBricks = [
		"X_brick",
		"X_long_brick",
		"X_short_brick",
		"cracked_X_brick",
		"cracked_X_long_brick",
		"cracked_X_short_brick",
		"mossy_X_brick"
	]
	let createDecoColors = [
		"worn",
		"red",
		"dean",
		"scarlet",
		"pearl",
		"blue",
		"dusk"
	]
	makeGroupedByComplexList("createdeco", createDecoBricks, createDecoColors, GroupTypes.Fuzzy)
	let createDeco = [
		"trapdoor",
		"door",
		"hull",
		"ladder",
		"support",
		"decal",
		"placard",
		"gold_lamp",
		"netherite_lamp",
		"andesite_lamp",
		"brass_lamp",
		"cast_iron_lamp",
		"iron_lamp",
		"copper_lamp",
		"zinc_lamp"
	]
	makeGroupedByRegex("createdeco", createDeco, GroupTypes.Prefix)
	createDeco = [
		"gold_sheet",
		"netherite_sheet",
		"andesite_sheet",
		"brass_sheet",
		"cast_iron_sheet",
		"iron_sheet",
		"copper_sheet",
		"zinc_sheet"
	]
	makeGroupedByRegex("createdeco", createDeco, GroupTypes.Postfix)
	makeGroupedByRegex("alloyed", ["bronze_block"], GroupTypes.Fuzzy)

	//Botania
	let botaniaRegexBlocks = [
		"petal_block",
		"mystical_flower",
		"double_flower",
		"shiny_flower",
		"mushroom",
		"petal",
		"floating_flower",
		"seeds",
		"hydroangeas",
		"endoflame",
		"pure_daisy",
		"manastar",
		"thermalily",
		"rosa_arcana",
		"munchdew",
		"entropinnyum",
		"kekimurus",
		"gourmaryllis",
		"narslimmus",
		"spectrolus",
		"dandelifeon",
		"rafflowsia",
		"shulk_me_not",
		"bellethorn",
		"bergamute",
		"dreadthorn",
		"heisei_dream",
		"tigerseye",
		"jaded_amaranthus",
		"orechid",
		"fallen_kanade",
		"exoflame",
		"agricarnation",
		"hopperhock",
		"tangleberrie",
		"jiyuulia",
		"rannuncarpus",
		"hyacidus",
		"pollidisiac",
		"clayconia",
		"loonium",
		"daffomill",
		"vinculotus",
		"spectranthemum",
		"medumone",
		"marimorphosis",
		"bubbell",
		"solegnolia",
		"orechid_ignem",
		"labellia",
		"apothecary",
		"azulejo",
		"lens",
		"pattern",
		"dark_quartz",
		"mana_quartz",
		"blaze_quartz",
		"lavender_quartz",
		"red_quartz",
		"elf_quartz",
		"sunny_quartz",
		"pavement",
		"cosmetic"
	]
	makeGroupedByRegex("botania",botaniaRegexBlocks, GroupTypes.Fuzzy)
	event.groupItems(
		"botania:rei_groups/fuchsite",
		"Fuchsite",
		/botania:.*metamorphic_forest.*/
	)
	event.groupItems(
		"botania:rei_groups/talc",
		"Talc",
		/botania:.*metamorphic_plains.*/
	)
	event.groupItems(
		"botania:rei_groups/gneiss",
		"Gneiss",
		/botania:.*metamorphic_mountain.*/
	)
	event.groupItems(
		"botania:rei_groups/mycelite",
		"Mycelite",
		/botania:.*metamorphic_fungal.*/
	)
	event.groupItems(
		"botania:rei_groups/mycelite",
		"Mycelite",
		/botania:.*metamorphic_fungal.*/
	)
	event.groupItems(
		"botania:rei_groups/cataclasite",
		"Cataclasite",
		/botania:.*metamorphic_swamp.*/
	)
	event.groupItems(
		"botania:rei_groups/solite",
		"Solite",
		/botania:.*metamorphic_desert.*/
	)
	event.groupItems(
		"botania:rei_groups/lunite",
		"Lunite",
		/botania:.*metamorphic_taiga.*/
	)
	event.groupItems(
		"botania:rei_groups/rosytalc",
		"Rosy Talc",
		/botania:.*metamorphic_mesa.*/
	)
	
	event.groupItems(
		"cookingforblockheads:rei_groups/kitchen_floor",
		"Kitchen Floor",
		/cookingforblockheads:.*kitchen_floor/
	);

	//PneumaticCraft
	let pneumaticcraftTagBlocks = [
		"smooth_plastic_bricks",
		"plastic_bricks"
	]
	makeGroupedByTag("pneumaticcraft", pneumaticcraftTagBlocks)
	let pneumaticcraftBlocks = [
		"wall_lamp"
	]
	makeGroupedByRegex("pneumaticcraft",pneumaticcraftBlocks, GroupTypes.Postfix)
	pneumaticcraftBlocks = [
		"plastic_bracket"
	]
	makeGroupedByRegex("compressedcreativity",pneumaticcraftBlocks, GroupTypes.Prefix)
	pneumaticcraftBlocks = [
		"upgrade"
	]
	makeGroupedByRegex("pneumaticcraft", pneumaticcraftBlocks, GroupTypes.Fuzzy)

	let functionalRegex = [
		"_1",
		"_2",
		"_4"
	]
	event.groupItems("functionalstorage:rei_groups/1x1", "1x1 Drawers", /functionalstorage:.*_1/)
	event.groupItems("functionalstorage:rei_groups/1x2", "1x2 Drawers", /functionalstorage:.*_2/)
	event.groupItems("functionalstorage:rei_groups/2x2", "2x2 Drawers", /functionalstorage:.*_4/)

	let mekanismRegex = [
		"dirty_dust",
		"dust",
		"shard",
		"crystal",
		"clump",
		"enriched",
		"module"
	]
	makeGroupedByRegex("mekanism", mekanismRegex, GroupTypes.Postfix)
	mekanismRegex = [
		"osmium_ore",
		"tin_ore",
		"uranium_ore",
		"fluorite_ore",
		"lead_ore",
		"induction_cell",
		"induction_provider",
		"bin",
		"energy_cube",
		"fluid_tank",
		"tier_installer",
		"universal_cable",
		"mechanical_pipe",
		"pressurized_tube",
		"logistical_transporter",
		"thermodynamic_conductor",
		"chemical_tank"
	]
	makeGroupedByRegex("mekanism", mekanismRegex, GroupTypes.Prefix)
	event.groupItems("mekanism:rei_groups/crusher", "Crushers", [
		"mekanism:crusher",
		/mekanism:.*crushing_factory/
	])
	event.groupItems("mekanism:rei_groups/smelter", "Smelters", [
		"mekanism:energized_smelter",
		/mekanism:.*smelting_factory/
	])
	event.groupItems("mekanism:rei_groups/enrichment", "Enrichers", [
		"mekanism:enrichment_chamber",
		/mekanism:.*enriching_factory/
	])
	event.groupItems("mekanism:rei_groups/compress", "Compressors", [
		"mekanism:osmium_compressor",
		/mekanism:.*compressing_factory/
	])
	event.groupItems("mekanism:rei_groups/combine", "Combiners", [
		"mekanism:combiner",
		/mekanism:.*combining_factory/
	])
	event.groupItems("mekanism:rei_groups/infuse", "Infusers", [
		"mekanism:metallurgic_infuser",
		/mekanism:.*infusing_factory/
	])
	event.groupItems("mekanism:rei_groups/purify", "Purifiers", [
		"mekanism:purification_chamber",
		/mekanism:.*purifying_factory/
	])
	event.groupItems("mekanism:rei_groups/inject", "Injecters", [
		"mekanism:chemical_injection_chamber",
		/mekanism:.*injecting_factory/
	])
	event.groupItems("mekanism:rei_groups/saw", "Sawmills", [
		"mekanism:precision_sawmill",
		/mekanism:.*sawing_factory/
	])

	event.groupFluids(
		"tconstruct:rei_groups/tinkers_fluids",
		"Tinkers Fluids",
		Ku.Fluids.getFluidsByNamespaces(["tconstruct", "tcintegrations"]).toArray()
	)
	event.groupFluids(
		"pneumaticcraft:rei_groups/pneumatic_fluids",
		"Pneumaticcraft Fluids",
		Ku.Fluids.getFluidsByNamespace("pneumaticcraft").toArray()
	)
	event.groupFluids(
		"create:rei_groups/functional_fluids",
		"Create Functional Fluids",
		Ku.Fluids.getFluidsByNamespaces(["create", "createaddition", "create_enchantment_industry"]).toArray()
	)
	event.groupFluids(
		"create:rei_groups/yummy_fluids",
		"Create Yummy Fluids",
		Ku.Fluids.getFluidsByNamespaces(["create_factory", "create_confectionery"]).toArray()
	)
	event.groupFluids(
		"minecraft:rei_groups/fluids",
		"Vanilla Fluids",
		Ku.Fluids.getFluidsByNamespace("minecraft").toArray()
	)
	event.groupFluids(
		"mekanism:rei_groups/fluids",
		"Mekanism Fluids",
		Ku.Fluids.getFluidsByNamespace("mekanism").toArray()
	)
	event.groupFluids(
		"bloodmagic:rei_groups/blood",
		"Bloodmagic Fluids",
		Ku.Fluids.getFluidsByNamespace("bloodmagic").toArray()
	)

	const mekGas = [
		"mekanism:hydrogen",
		"mekanism:oxygen",
		"mekanism:water_vapor",
		"mekanism:chlorine",
		"mekanism:sulfur_dioxide",
		"mekanism:sulfur_trioxide",
		"mekanism:sulfuric_acid",
		"mekanism:hydrogen_chloride",
		"mekanism:hydrofluoric_acid",
		"mekanism:uranium_oxide",
		"mekanism:uranium_hexafluoride",
		"mekanism:ethene",
		"mekanism:sodium",
		"mekanism:steam",
		"mekanism:superheated_sodium",
		"mekanism:brine",
		"mekanism:lithium",
		"mekanism:osmium",
		"mekanism:fissile_fuel",
		"mekanism:nuclear_waste",
		"mekanism:spent_nuclear_waste",
		"mekanism:plutonium",
		"mekanism:polonium",
		"mekanism:antimatter",
		"mekanismgenerators:deuterium",
		"mekanismgenerators:tritium",
		"mekanismgenerators:fusion_fuel",
	];
	event.groupEntries(
		`mekanism:rei_groups/gas`,
		"Gas",
		"mekanism:jei_plugin_jei_compat_gasstack",
		mekGas
	);
	const pigment = [
		"mekanism:black",
		"mekanism:blue",
		"mekanism:green",
		"mekanism:cyan",
		"mekanism:dark_red",
		"mekanism:purple",
		"mekanism:orange",
		"mekanism:light_gray",
		"mekanism:gray",
		"mekanism:light_blue",
		"mekanism:lime",
		"mekanism:aqua",
		"mekanism:red",
		"mekanism:magenta",
		"mekanism:yellow",
		"mekanism:white",
		"mekanism:brown",
		"mekanism:pink",
	];
	event.groupEntries(
		`mekanism:rei_groups/pigment`,
		"Pigments",
		"mekanism:jei_plugin_jei_compat_pigmentstack",
		pigment
	);
	const mekInfuse = [
		"mekanism:carbon",
		"mekanism:redstone",
		"mekanism:diamond",
		"mekanism:refined_obsidian",
		"mekanism:gold",
		"mekanism:tin",
		"mekanism:fungi",
		"mekanism:bio",
	];
	event.groupEntries(
		`mekanism:rei_groups/infuse`,
		"Infusing",
		"mekanism:jei_plugin_jei_compat_infusionstack",
		mekInfuse
	);
	const mekSlurry = [
		"mekanism:dirty_iron",
		"mekanism:clean_iron",
		"mekanism:dirty_gold",
		"mekanism:clean_gold",
		"mekanism:dirty_osmium",
		"mekanism:clean_osmium",
		"mekanism:dirty_copper",
		"mekanism:clean_copper",
		"mekanism:dirty_tin",
		"mekanism:clean_tin",
		"mekanism:dirty_lead",
		"mekanism:clean_lead",
		"mekanism:dirty_uranium",
		"mekanism:clean_uranium",
	];
	event.groupEntries(
		`mekanism:rei_groups/slurry`,
		"Slurries",
		"mekanism:jei_plugin_jei_compat_slurrystack",
		mekSlurry
	);

	let arsRegexItems = [
		"glyph",
		"ritual"
	]
	makeGroupedByRegex("ars_nouveau", arsRegexItems, GroupTypes.Postfix)
	arsRegexItems = [
		"sbed"
	]
	makeGroupedByRegex("ars_nouveau", arsRegexItems, GroupTypes.Prefix)

	//Tinkers
	let tinkersTagBlocks = [
		"smeltery",
		"foundry"
	]
	makeGroupedByTag("tconstruct", tinkersTagBlocks)
	let tinkersRegexBlocks = [
		"slime_dirt",
		"slime_grass",
		"platform",
		"fern",
		"grass",
	]
	makeGroupedByRegex("tconstruct", tinkersRegexBlocks, GroupTypes.Prefix)
	event.groupItemsByTag(
		`tconstruct:rei_groups/single_use`,
		`Single-use Casts`,
		`tconstruct:casts/single_use`
	);
	event.groupItemsByTag(
		`tconstruct:rei_groups/multi_use`,
		`Multi-use Casts`,
		`tconstruct:casts/multi_use`
	);
	event.groupEntries(
		`tconstruct:rei_groups/tcon_modifier`,
		"Tinkers Construct Modifiers",
		"tconstruct:jei_plugin_jei_compat_modifierentry",
		tinkModifiers
	)
});

const tinkModifiers = [
	"tconstruct:blindshot",
	"tconstruct:ambidextrous",
	"tconstruct:blocking",
	"tconstruct:boundless",
	"tconstruct:bulk_quiver",
	"tconstruct:crystalshot",
	"tconstruct:depth_strider",
	"tconstruct:freezing",
	"tconstruct:impaling",
	"tconstruct:long_fall",
	"tconstruct:multishot",
	"tconstruct:parrying",
	"tconstruct:power",
	"tconstruct:punch",
	"tconstruct:quick_charge",
	"tconstruct:rebalanced",
	"tconstruct:reflecting",
	"tconstruct:scope",
	"tconstruct:sinistral",
	"tconstruct:trick_quiver",
	"tconstruct:trueshot",
	"tconstruct:expanded",
	"tconstruct:embellishment",
	"tconstruct:golden",
	"tconstruct:shulking",
	"tconstruct:step_up",
	"tconstruct:wetting",
	"tconstruct:haste_armor",
	"tconstruct:gilded",
	"tconstruct:reach",
	"tconstruct:unbreakable",
	"tconstruct:aqua_affinity",
	"tconstruct:autosmelt",
	"tconstruct:bucketing",
	"tconstruct:dual_wielding",
	"tconstruct:exchanging",
	"tconstruct:glowing",
	"tconstruct:luck",
	"tconstruct:melting",
	"tconstruct:silky",
	"tconstruct:spilling",
	"tconstruct:firestarter",
	"tconstruct:pathing",
	"tconstruct:stripping",
	"tconstruct:tilling",
	"tconstruct:double_jump",
	"tconstruct:bouncy",
	"tconstruct:pockets",
	"tconstruct:protection",
	"tconstruct:shield_strap",
	"tconstruct:slurping",
	"tconstruct:strength",
	"tconstruct:tool_belt",
	"tconstruct:unarmed",
	"tconstruct:wings",
	"tconstruct:zoom",
	"tconstruct:flamewake",
	"tconstruct:frost_walker",
	"tconstruct:path_maker",
	"tconstruct:plowing",
	"tconstruct:snowdrift",
	"tconstruct:blast_protection",
	"tconstruct:magic_protection",
	"tconstruct:projectile_protection",
	"tconstruct:melee_protection",
	"tconstruct:fire_protection",
	"tconstruct:knockback_resistance",
	"tconstruct:revitalizing",
	"tconstruct:dragonborn",
	"tconstruct:turtle_shell",
	"tconstruct:creative_slot",
	"tconstruct:dyed",
	"tconstruct:nearsighted",
	"tconstruct:farsighted",
	"tconstruct:overslime",
	"tconstruct:shiny",
	"tconstruct:worldbound",
	"tconstruct:writable",
	"tconstruct:recapitated",
	"tconstruct:harmonious",
	"tconstruct:resurrected",
	"tconstruct:draconic",
	"tconstruct:red_extra_upgrade",
	"tconstruct:green_extra_upgrade",
	"tconstruct:blue_extra_upgrade",
	"tconstruct:extra_ability",
	"tconstruct:diamond",
	"tconstruct:emerald",
	"tconstruct:experienced",
	"tconstruct:fireprimer",
	"tconstruct:magnetic",
	"tconstruct:netherite",
	"tconstruct:offhanded",
	"tconstruct:overforced",
	"tconstruct:reinforced",
	"tconstruct:soulbound",
	"tconstruct:tank",
	"tconstruct:the_one_probe",
	"tconstruct:blasting",
	"tconstruct:fortune",
	"tconstruct:haste",
	"tconstruct:hydraulic",
	"tconstruct:lightspeed",
	"tconstruct:antiaquatic",
	"tconstruct:bane_of_sssss",
	"tconstruct:cooling",
	"tconstruct:fiery",
	"tconstruct:killager",
	"tconstruct:knockback",
	"tconstruct:looting",
	"tconstruct:padded",
	"tconstruct:piercing",
	"tconstruct:severing",
	"tconstruct:sharpness",
	"tconstruct:smite",
	"tconstruct:sweeping_edge",
	"tconstruct:swiftstrike",
	"tconstruct:armor_power",
	"tconstruct:feather_falling",
	"tconstruct:knockback_armor",
	"tconstruct:leaping",
	"tconstruct:lightspeed_armor",
	"tconstruct:item_frame",
	"tconstruct:pocket_chain",
	"tconstruct:respiration",
	"tconstruct:ricochet",
	"tconstruct:soulspeed",
	"tconstruct:speedy",
	"tconstruct:springy",
	"tconstruct:sticky",
	"tconstruct:thorns",
	"tconstruct:cultivated",
	"tconstruct:dense",
	"tconstruct:ductile",
	"tconstruct:enderporting",
	"tconstruct:enhanced",
	"tconstruct:lightweight",
	"tconstruct:overcast",
	"tconstruct:overgrowth",
	"tconstruct:overlord",
	"tconstruct:overworked",
	"tconstruct:solar_powered",
	"tconstruct:stoneshield",
	"tconstruct:stringy",
	"tconstruct:sturdy",
	"tconstruct:tanned",
	"tconstruct:tasty",
	"tconstruct:airborne",
	"tconstruct:dwarven",
	"tconstruct:jagged",
	"tconstruct:lustrous",
	"tconstruct:momentum",
	"tconstruct:sharpweight",
	"tconstruct:temperate",
	"tconstruct:conducting",
	"tconstruct:crumbling",
	"tconstruct:decay",
	"tconstruct:heavy",
	"tconstruct:insatiable",
	"tconstruct:invariant",
	"tconstruct:lacerating",
	"tconstruct:maintained",
	"tconstruct:maintained_2",
	"tconstruct:necrotic",
	"tconstruct:raging",
	"tconstruct:scorching",
	"tconstruct:searing",
	"tconstruct:stonebound",
	"tconstruct:boon_of_sssss",
	"tconstruct:breathtaking",
	"tconstruct:chrysophilite",
	"tconstruct:enderdodging",
	"tconstruct:firebreath",
	"tconstruct:frosttouch",
	"tconstruct:gold_guard",
	"tconstruct:mithridatism",
	"tconstruct:plague",
	"tconstruct:revenge",
	"tconstruct:self_destructive",
	"tconstruct:strong_bones",
	"tconstruct:wildfire",
	"tconstruct:withered",
	"tconstruct:creeper_disguise",
	"tconstruct:enderman_disguise",
	"tconstruct:skeleton_disguise",
	"tconstruct:stray_disguise",
	"tconstruct:wither_skeleton_disguise",
	"tconstruct:spider_disguise",
	"tconstruct:cave_spider_disguise",
	"tconstruct:zombie_disguise",
	"tconstruct:husk_disguise",
	"tconstruct:drowned_disguise",
	"tconstruct:blaze_disguise",
	"tconstruct:piglin_disguise",
	"tconstruct:piglin_brute_disguise",
	"tconstruct:zombified_piglin_disguise",
	"tconstruct:wood",
	"tconstruct:flint",
	"tconstruct:bone",
	"tconstruct:necrotic_bone",
	"tconstruct:string",
	"tconstruct:leather",
	"tconstruct:vine",
	"tconstruct:iron",
	"tconstruct:copper",
	"tconstruct:seared_stone",
	"tconstruct:bloodbone",
	"tconstruct:scorched_stone",
	"tconstruct:chain",
	"tconstruct:skyslime_vine",
	"tconstruct:slimewood",
	"tconstruct:slimesteel",
	"tconstruct:amethyst_bronze",
	"tconstruct:nahuatl",
	"tconstruct:rose_gold",
	"tconstruct:pig_iron",
	"tconstruct:cobalt",
	"tconstruct:darkthread",
	"tconstruct:queens_slime",
	"tconstruct:hepatizon",
	"tconstruct:manyullyn",
	"tconstruct:blazing_bone",
	"tconstruct:ancient_hide",
	"tconstruct:enderslime_vine",
	"tconstruct:osmium",
	"tconstruct:tungsten",
	"tconstruct:platinum",
	"tconstruct:silver",
	"tconstruct:lead",
	"tconstruct:whitestone",
	"tconstruct:steel",
	"tconstruct:bronze",
	"tconstruct:constantan",
	"tconstruct:invar",
	"tconstruct:necronium",
	"tconstruct:electrum",
	"tconstruct:plated_slimewood",
	"tconstruct:obsidian",
	"tconstruct:debris",
	"tconstruct:netherite",
	"tconstruct:aluminum",
	"tconstruct:nickel",
	"tconstruct:tin",
	"tconstruct:zinc",
	"tconstruct:brass",
	"tconstruct:uranium",
	"tconstruct:gold",
	"tconstruct:gunpowder",
	"tconstruct:rotten_flesh",
	"tconstruct:spider",
	"tconstruct:venom",
	"tconstruct:ender_pearl",
	"tconstruct:earthslime",
	"tconstruct:skyslime",
	"tconstruct:blood",
	"tconstruct:ichor",
	"tconstruct:enderslime",
	"tconstruct:clay",
	"tconstruct:honey",
	"tconstruct:phantom",
	"tconstruct:chorus",
	"tconstruct:rabbi",
	"tconstruct:wood",
	"tconstruct:stone",
	"tconstruct:iron",
	"tconstruct:diamond",
	"tconstruct:netherite",
	"tcintegrations:ars_nouveau",
	"tcintegrations:elemental",
	"tcintegrations:enchanters_shield",
	"tcintegrations:engineers_goggles",
	"tcintegrations:glowup",
	"tcintegrations:great_fairy",
	"tcintegrations:mechanical_arm",
	"tcintegrations:multivision",
	"tcintegrations:terra",
	"tcintegrations:terrestrial",
  ];