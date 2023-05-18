// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true
var a = 0
var b = 0
var c = 0
var thisServer

function spawnStructure(server, dimension, structure, x, y, z) {
    let level = server.getLevel(dimension).minecraftLevel
    let spawnPos = new java('net.minecraft.core.BlockPos')(x, y, z)
    let StrcturePlaceSettings = java('net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings')
    server.minecraftServer.structureManager.get(structure).ifPresent(e => e.placeInWorld(level, spawnPos, spawnPos, new StrcturePlaceSettings(), level.random, 3))
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			Utils.server.runCommandSilent(`setchunkbiome minecraft:birch_forest ${x+(16*i)} ${y} ${z+(j*16)}`)
		}
	}
}

console.info('Hello, World! (You will see this line every time server resources reload)')

onEvent('server.load', event => {
	thisServer = event.getServer()
})
onEvent('recipes', event => {
	// Change recipes here
})

onEvent('item.tags', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')

	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')
})

onEvent('mbd.status_changed.multiblocked.pedestal', event => {
	
	console.info(event.getComponent().getBlockPos().toString())
	console.info(event.getComponent().getSlotNames()[0])
})

onEvent('mbd.right_click.sky_island.island_forge', event => {
	random()
	console.info(E)
	console.info(event.getHand().toString())
	console.info(event.getHand().describeConstable().toString())
	console.info(event.getComponent().getBlockPos().toString())
	console.info(event.getPlayer().getMainHandItem().getItem().toString())
	a=event.getComponent().getBlockPos().getX()
	b=event.getComponent().getBlockPos().getY()
	c=event.getComponent().getBlockPos().getZ()

})
onEvent('mbd.part_added.multiblocked.pedestal', event => { 
	console.info(event.getController().getBlockPos().toString())
})

onEvent('mbd.recipe_finish_post.sky_island.island_forge', event => {
	spawnStructure(thisServer, 'minecraft:overworld','sky:test', a+45,b,c-45)
})