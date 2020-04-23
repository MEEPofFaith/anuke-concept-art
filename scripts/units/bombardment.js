var shots = 0;

const deffst = extend(MissileBulletType, {})
deffst.bulletSprite = "shell";
deffst.frontColor = Color.valueOf("f8ad42");
deffst.backColor = Color.valueOf("f68021");
deffst.trailColor = Color.valueOf("d06b53");
deffst.speed = 3.9;
deffst.damage = 720;
deffst.splashDamageRadius = 120;
deffst.splashDamage = 700;
deffst.bulletWidth = 16;
deffst.bulletHeight = 20;
deffst.bulletShrink = 0
deffst.keepVelocity = false;
deffst.despawnEffect = Fx.flakExplosionBig;
deffst.hitEffect = Fx.flakExplosionBig;
deffst.lifetime = 104; //About 50 blocks travel distance.

const satelite = extendContent(UnitType, "bombardment") {
    if(shooter.getTimer().get(shooter.getShootTimer(left), reload)){
      shots ++;
      if(shots > 3){
        shots = 0;
        
        if(owner == null) return;
        Tmp.v1.trns(angle, 3);
        Bullet.create(this.deffst, owner, owner.getTeam(), x + Tmp.v1.x, y + Tmp.v1.y, angle, (1 - velocityRnd) + Mathf.random(velocityRnd));
        
        //shoot effect
        Draw.color(Color.valueOf("eba313"), Color.valueOf("f28a2e"), Color.valueOf("696969"), e.fin());
        Angles.randLenVectors(e.id, 10, e.finpow() * 70, e.rotation, 10, (x, y) => {
            Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.6);
        });
      }
    }
});
satelite.create(prov(() => new JavaAdapter(HoverUnit, {
    onDeath(){
        for(var yes = 0; yes < 360; yes += 36){
        Bullet.create(deffst, owner, owner.getTeam(), x + Tmp.v1.x, y + Tmp.v1.y, yes + Mathf.random(-15,15), (1 - velocityRnd) + Mathf.random(velocityRnd));
      }
		}
    this.super$onDeath();
})));