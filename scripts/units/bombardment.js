var shots = 3;
const vec = new Vec2();

const deffst = extend(MissileBulletType, {})
deffst.bulletSprite = "shell";
deffst.frontColor = Color.valueOf("f8ad42");
deffst.backColor = Color.valueOf("f68021");
deffst.trailColor = Color.valueOf("d06b53");
deffst.speed = 3.9;
deffst.damage = 720;
deffst.drag = -0.02;
deffst.splashDamageRadius = 120;
deffst.splashDamage = 700;
deffst.bulletWidth = 16;
deffst.bulletHeight = 20;
deffst.bulletShrink = 0
deffst.keepVelocity = false;
deffst.despawnEffect = Fx.flakExplosionBig;
deffst.hitEffect = Fx.flakExplosionBig;
deffst.lifetime = 104; //About 50 blocks travel distancthis.

const satelite = extendContent(UnitType, "bombardment", {
  update(){
		this.super$update();
    if(this.getShootTimer(true)==2){
      this.shots ++;
      if(this.shots > 3){
        this.shots = 0;
        
        vec.trns(0, 0, 4);
        Calls.createBullet(deffst, this.getTeam(), this.x, this.y + vec.y, this.rot, (1 - 0.2) + Mathf.random(0.2), 104);
        
        //shoot effect
        /*Draw.color(Color.valueOf("eba313"), Color.valueOf("f28a2e"), Color.valueOf("696969"), this.fin());
        Angles.randLenVectors(this.id, 10, this.finpow() * 70, this.rot(), 10, (x, y) => {
            Fill.circle(this.x + x, this.y + y, 0.65 + this.fout() * 1.6);
        });*/
      }
    }
  }
});
satelite.create(prov(() => new JavaAdapter(HoverUnit, {
  onDeath(){
    this.super$onDeath();
    for(var yes = 0; yes < 360; yes += 5){
      vec.trns(0, 0, -4);
      Calls.createBullet(deffst, this.getTeam(), this.x, this.y + vec.y, yes + Mathf.random(-10,10), (0.8) + Mathf.random(0.2), 104);
    }
  }
})));