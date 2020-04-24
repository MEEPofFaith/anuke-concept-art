const vec = new Vec2();
var t = 1;

//effect yoinked from z0mbiesrock/Diamond-Ore
const flammen = newEffect(45, e => {
	Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#e68b02"), e.fin());
    const d = new Floatc2({get(x, y){
    Fill.circle(e.x + x, e.y + y, 0.25 + e.fin() * 3);
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
deffst.splashDamage = 1420;
deffst.bulletWidth = 16;
deffst.bulletHeight = 20;
deffst.bulletShrink = 0
deffst.keepVelocity = false;
deffst.despawnEffect = Fx.flakExplosionBig;
deffst.hitEffect = Fx.flakExplosionBig;
deffst.lifetime = 62; //About 30 blocks travel distancthis.
deffst.collides = true;
deffst.collidesTiles = true;
deffst.collidesAir = true;
//deffst.hitSound = Sounds.orbitalblast;

const satelite = extendContent(UnitType, "bombardment", {});
satelite.create(prov(() => new JavaAdapter(HoverUnit, {
  onDeath(){
    this.super$onDeath();
    for(var yes = 0; yes < 360; yes += 5){
      vec.trns(0, 0, -4);
      Calls.createBullet(deffst, this.getTeam(), this.x, this.y + vec.y, yes + Mathf.random(-10,10), (0.8) + Mathf.random(0.2), 104);
    }
  },
  behavior(){
		this.super$behavior();
    if(shooter.getTimer().get(shooter.getShootTimer(left), reload)){
      if(++t >= 5){
        t = 1;
        
        vec.trns(0, 0, 4);
        Calls.createBullet(deffst, this.getTeam(), this.x, this.y + vec.y, this.rotation, (1 - 0.2) + Mathf.random(0.2), 104);
        
        //shoot effect
        /*Draw.color(Color.valueOf("eba313"), Color.valueOf("f28a2e"), Color.valueOf("696969"));
        Angles.randLenVectors(this.id, 10, this.finpow() * 70, this.rotation, 10, (x, y) => {
            Fill.circle(this.x + x, this.y + y, 0.65 + this.fout() * 1.6);
        });*/
      }
    }
  }
})));