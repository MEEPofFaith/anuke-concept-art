const vec = new Vec2();
var t = 1;
var shooty = 120;

//effect yoinked from EyeofDarkness/AdvanceContent
const shipTrail = newEffect(90, e => {
	const lightRegion = Core.atlas.find("kitty-concept-art-bombardment-engine");
	
	Draw.blend(Blending.additive);
	Draw.color(Color.valueOf("722a18"), Color.valueOf("36080230"), e.fin());
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
const deffstBoom = newEffect(30, e => {
  var intensity = 8;

  Lines.stroke(e.fout() * 3.1);
  Lines.circle(e.x, e.y, (3.0 + e.fin() * 14.0) * intensity);

  const c = new Floatc2({get(x, y){
    Draw.color(Color.gray);
    Fill.circle(e.x + x, e.y + y, e.fout() * (2.0 + intensity) * 3 + 0.5);
    Fill.circle(e.x + x / 2.0, e.y + y / 2.0, e.fout() * (intensity) * 3);
  }})
  
  Angles.randLenVectors(e.id, e.finpow(), (6 * intensity), 21.0 * intensity, 360 * e.fin(), c);
  
  const l = new Floatc2({get(x, y){
    Draw.color(Pal.lighterOrange, Pal.lightOrange, Color.gray, e.fin());
    Lines.stroke((1.7 * e.fout()) * (1.0 + (intensity - 1.0) / 2.0));
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1.0 + e.fout() * 4 * (3.0 + intensity));
  }})
  
  Angles.randLenVectors(e.id + 1, e.finpow(), (9 * intensity), 40.0 * intensity, 360 * e.fin(), l);
});

const deffst = extend(ArtilleryBulletType, {})
deffst.bulletSprite = "missile";
deffst.frontColor = Color.valueOf("f8ad42");
deffst.backColor = Color.valueOf("f68021");
deffst.trailColor = Color.valueOf("d06b53");
deffst.trailEffect = flammen;
deffst.speed = 3.9;
deffst.damage = 350;
deffst.drag = -0.05;
deffst.splashDamageRadius = 120;
deffst.splashDamage = 900;
deffst.bulletWidth = 32;
deffst.bulletHeight = 36;
deffst.bulletShrink = 0;
deffst.keepVelocity = false;
deffst.despawnEffect = deffstBoom;
deffst.hitEffect = deffstBoom;
deffst.lifetime = 62; //About 30 blocks travel distance.
deffst.homingPower = 0.1;
deffst.homingRadius = 80;
deffst.collides = true;
deffst.collidesTiles = true;
deffst.collidesAir = true;

const flamingdebris = newEffect(15, e => {
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
deathblast.speed = 2.5;
deathblast.damage = 100;
deathblast.drag = -0.05;
deathblast.splashDamageRadius = 40;
deathblast.splashDamage = 200;
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
    for(var yes = 0; yes < 360; yes ++){
      vec.trns(0, 0, -4);
      Calls.createBullet(deathblast, this.getTeam(), this.x, this.y + vec.y, yes, 1, 104);
    }
  },
  behavior(){
		this.super$behavior();
    
    if(this.target != null){
      if(t++ >= shooty){
        shooty = Mathf.random(60, 180);
        t = 0;
        
        vec.trns(0, 0, 4);
        Calls.createBullet(deffst, this.getTeam(), this.x, this.y + vec.y, this.rotation, (1 - 0.2) + Mathf.random(0.2), 104);
      }
    }
  },
  update(){
    this.super$update();
    
    const vectA = new Vec2();
		const shift = Mathf.clamp(this.velocity().len(), 0, 4);
    
    vectA.trns(this.velocity().angle() + 90, 0 + Mathf.range(-0.1, 0.1), shift * 2 + Mathf.range(-0, 0.5));
    Effects.effect(shipTrail, this.x + vectA.x, this.y + vectA.y, this.rotation);
  }
})));