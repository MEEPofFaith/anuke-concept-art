const vec = new Vec2();
var t = 1;
var shooty = 120;

//effect yoinked from EyeofDarkness/AdvanceContent
const shipTrail = newEffect(24, e => {
	const lightRegion = Core.atlas.find("kitty-concept-art-bombardment-engine");
	
	Draw.blend(Blending.additive);
	Draw.color(Color.valueOf("722a18"), Color.valueOf("36080230"), e.fin());
  Angles.randLenVectors(e.id, 6, -10 + 40 * e.fin(), e.rotation + 180, 360 * e.fin(),d);
	Draw.rect(lightRegion, e.x, e.y, e.rotation - 90);
	Draw.blend();
	
	//Draw.color(Color.valueOf("ffffff"));
	//Fill.circle(e.x, e.y, (1 * e.fout()) * (e.rotation / 1.3));
});

//effect yoinked from z0mbiesrock/Diamond-Ore
const flammen = newEffect(45, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#e68b02"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 0.25 + e.fin() * 5);
    }})
    Angles.randLenVectors(e.id, 6, -10 + 40 * e.fin(), e.rotation + 180, 360 * e.fin(),d);
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#e68b02"), e.fout());
    Angles.randLenVectors(e.id, 6, -10 + 40 * e.fout(), e.rotation, 360 * e.fout(),d);
});
const deffst = extend(ArtilleryBulletType, {})
deffst.bulletSprite = "shell";
deffst.frontColor = Color.valueOf("f8ad42");
deffst.backColor = Color.valueOf("f68021");
deffst.trailColor = Color.valueOf("d06b53");
deffst.trailEffect = flammen;
deffst.speed = 3.9;
deffst.damage = 1500;
deffst.drag = -0.05;
deffst.splashDamageRadius = 120;
deffst.splashDamage = 1450;
deffst.bulletWidth = 16;
deffst.bulletHeight = 20;
deffst.bulletShrink = 0;
deffst.keepVelocity = false;
deffst.despawnEffect = Fx.flakExplosionBig;
deffst.hitEffect = Fx.flakExplosionBig;
deffst.lifetime = 62; //About 30 blocks travel distancthis.
deffst.collides = true;
deffst.collidesTiles = true;
deffst.collidesAir = true;

const flamingdebris = newEffect(45, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#e68b02"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 0.25 + e.fin() * 2);
    }})
    Angles.randLenVectors(e.id, 6, -10 + 40 * e.fin(), e.rotation + 180, 360 * e.fin(),d);
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#e68b02"), e.fout());
    Angles.randLenVectors(e.id, 6, -10 + 40 * e.fout(), e.rotation, 360 * e.fout(),d);
});
const deathblast = extend(ArtilleryBulletType,{})
deathblast.bulletSprite = "kitty-concept-art-none";
deathblast.frontColor = Color.valueOf("f8ad42");
deathblast.backColor = Color.valueOf("f68021");
deathblast.trailColor = Color.valueOf("d06b53");
deathblast.trailEffect = flamingdebris;
deathblast.speed = 3.9;
deathblast.damage = 1000;
deathblast.drag = -0.05;
deathblast.splashDamageRadius = 40;
deathblast.splashDamage = 980;
deathblast.bulletWidth = 16;
deathblast.bulletHeight = 20;
deathblast.bulletShrink = 0;
deathblast.drawSize = 0;
deathblast.keepVelocity = false;
deathblast.despawnEffect = Fx.flakExplosionBig;
deathblast.hitEffect = Fx.flakExplosionBig;
deathblast.lifetime = 62; //About 30 blocks travel distance.
deathblast.collides = true;
deathblast.collidesTiles = true;
deathblast.collidesAir = true;

const satelite = extendContent(UnitType, "bombardment", {});
satelite.engineOffset = 36
satelite.engineSize = 7.5;
satelite.create(prov(() => new JavaAdapter(HoverUnit, {
  onDeath(){
    this.super$onDeath();
    for(var yes = 0; yes < 360; yes += 2){
      vec.trns(0, 0, -4);
      Calls.createBullet(deathblast, this.getTeam(), this.x, this.y + vec.y, yes + Mathf.random(-10,10), (0.8) + Mathf.random(0.2), 104);
    }
  },
  behavior(){
		this.super$behavior();
    
    if(t++ >= shooty){
      shooty = Mathf.random(90, 150);
      t = 0;
      
      vec.trns(0, 0, 4);
      Calls.createBullet(deffst, this.getTeam(), this.x, this.y + vec.y, this.rotation, (1 - 0.2) + Mathf.random(0.2), 104);
      
      //shoot effect
      /*Draw.color(Color.valueOf("eba313"), Color.valueOf("f28a2e"), Color.valueOf("696969"));
      Angles.randLenVectors(this.id, 10, this.finpow() * 70, this.rotation, 10, (x, y) => {
          Fill.circle(this.x + x, this.y + y, 0.65 + this.fout() * 1.6);
      });*/
    }
  },
  drawUnder(){
  },
  drawOver(){
    const overhang = Core.atlas.find("kitty-concept-art-bombardment-overhang");
    Draw.rect(overhang, this.x, this.y, this.rotation - 90);
    drawEngine();
  },
  update(){
    this.super$update();
    
    const vectA = new Vec2();
		const shift = Mathf.clamp(this.velocity().len(), 0, 4);
    
    if(e.getTimer().get(5, 1)){
			vectA.trns(e.velocity().angle() + 90, 0, shift * 2);
			Effects.effect(shipTrail, player.x + vectA.x + Mathf.range(1.0), player.y + vectA.y + Mathf.range(1.0), player.rotation);
		};
  }
})));