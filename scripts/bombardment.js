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

const deffst = extend(BasicBulletType, {
  hitTile(b, tile){
    this.hit(b, b.x, b.y);
  },
  despawned(b){
    this.hit(b, b.x, b.y);
  },
  hit(b, x, y){
    if(x != null && y != null && b != null){
      Sounds.explosion.at(b);
      Effects.shake(this.hitShake, this.hitShake, b);
      
      Effects.effect(Fx.bigShockwave, b.x, b.y);
      Effects.effect(Fx.impactcloud, b.x, b.y);
      Effects.effect(Fx.dynamicExplosion, b.x, b.y, 7.5);
    }
  },
  update(b){
    if(b != null){
      this.super$update(b);
      b.velocity().rotate(Mathf.sin(Time.time() + b.id * 4422, this.weaveScale, this.weaveMag) * Time.delta());
      
      if(b.timer.get(0, 3 + b.fslope() * 2)){
        Effects.effect(this.trailEffect, b.x, b.y, b.fslope() * 4);
      }
    }
  }
});
deffst.bulletSprite = "missile";
deffst.frontColor = Color.valueOf("f8ad42");
deffst.backColor = Color.valueOf("f68021");
deffst.trailColor = Color.valueOf("d06b53");
deffst.trailEffect = flammen;
deffst.speed = 5.85;
deffst.damage = 150;
deffst.drag = -0.05;
deffst.splashDamageRadius = 120;
deffst.splashDamage = 850;
deffst.bulletWidth = 32;
deffst.bulletHeight = 36;
deffst.bulletShrink = 0;
deffst.keepVelocity = true;
deffst.despawnEffect = Fx.none;
deffst.hitEffect = Fx.none;
//About 30 blocks travel distance.
deffst.lifetime = 93;
deffst.homingPower = 0.1;
deffst.homingRadius = 160;
deffst.collides = true;
deffst.collidesTiles = true;
deffst.collidesAir = true;
deffst.hitSound = Sounds.none;
deffst.hitShake = 32;
deffst.weaveScale = 9;
deffst.weaveMag = 3;

const deathblast = extend(BasicBulletType,{});
deathblast.bulletSprite = "kitty-concept-art-none";
deathblast.frontColor = Color.valueOf("f8ad42");
deathblast.backColor = Color.valueOf("f68021");
deathblast.trailColor = Color.valueOf("d06b53");
deathblast.speed = 10;
deathblast.damage = 100;
deathblast.splashDamage = 75;
deathblast.splashDamageRadius = 4;
deathblast.drag = -0.05;
deathblast.bulletWidth = 16;
deathblast.bulletHeight = 20;
deathblast.bulletShrink = 0;
deathblast.drawSize = 0;
deathblast.keepVelocity = false;
deathblast.despawnEffect = Fx.none;
deathblast.hitEffect = Fx.none;
//About 45 blocks travel distance.
deathblast.lifetime = 23.25;
deathblast.collides = true;
deathblast.collidesTiles = true;
deathblast.collidesAir = true;
deathblast.pierce = true;

const satelite = extendContent(UnitType, "bombardment", {});
satelite.engineOffset = 36
satelite.engineSize = 7.5;
satelite.create(prov(() => new JavaAdapter(HoverUnit, {
  /*load(){
    this.super$load();
    this.orbitalblast = new Packages.arc.mock.MockSound();
    
    (Core.assets.load("sounds/orbitalblast.ogg", Packages.arc.audio.Sound)).loaded = cons(a => this.orbitalblast = a);
  },*/
  onDeath(){
    this.super$onDeath();
    Effects.effect(Fx.impactShockwave, this.x, this.y);
    for(l = 0; l < 10; l++){
      Effects.effect(Fx.impactcloud, this.x, this.y);
    }
    Sounds.explosionbig.at(this.x, this.y);
    for(var yes = 0; yes < 360; yes ++){
      vec.trns(this.rotation-90, 0, -4);
      Calls.createBullet(deathblast, this.getTeam(), this.x + vec.x, this.y + vec.y, yes, 1, 1);
    }
  },
  behavior(){
		this.super$behavior();
    
    if(this.target != null){
      if(!Units.invalidateTarget(this.target, this)){
        if(t++ >= 120){
          t = 0;
          
          vec.trns(this.rotation-90, 0, 8);
          for(i = 0; i < 25; i++){
            var egg = Mathf.range(5);
            Effects.effect(Fx.shootBig, this.x + vec.x, this.y + vec.y, this.rotation + egg);
            Effects.effect(Fx.shootBigSmoke, this.x + vec.x, this.y + vec.y, this.rotation + egg);
          }
          //this.orbitalblast.at(this.x + vec.x, this.y + vec.y);
          Sounds.artillery.at(this.x + vec.x, this.y + vec.y);
          Sounds.missile.at(this.x + vec.x, this.y + vec.y);
          Calls.createBullet(deffst, this.getTeam(), this.x + vec.x, this.y + vec.y, this.rotation, 1, 1);
        }
      }
    }
  },
  update(){
    this.super$update();
    
    const vectA = new Vec2();
		const shift = Mathf.clamp(this.velocity().len(), 0, 4);
    
    vectA.trns(this.velocity().angle() + 90, 0 + Mathf.range(-0.5, 0.5), shift * 2 + Mathf.range(-0.5, 1));
    Effects.effect(shipTrail, this.x + vectA.x, this.y + vectA.y, this.rotation);
  }
})));