const shipTrail = newEffect(90, e => {
	const lightRegion = Core.atlas.find("kitty-concept-art-reaper-engine");
	
	Draw.blend(Blending.additive);
	Draw.color(Color.valueOf("722a18"), Color.valueOf("36080230"), e.fin());
	Draw.rect(lightRegion, e.x, e.y, e.rotation - 90);
	Draw.blend();

	//Draw.color(Color.valueOf("ffffff"));
	//Fill.circle(e.x, e.y, (1 * e.fout()) * (e.rotation / 1.3));
});
const grimm = extendContent(UnitType, "reaper", {});
grimm.create(prov(() => new JavaAdapter(HoverUnit, {
  update(){
    this.super$update();
    
    const vectA = new Vec2();
		const shift = Mathf.clamp(this.velocity().len(), 0, 4);
    
    vectA.trns(this.velocity().angle() + 90, 0, shift * 2);
    Effects.effect(shipTrail, this.x + vectA.x + Mathf.range(1.0), this.y + vectA.y + Mathf.range(1.0), this.rotation);
  }
})));