const entityLib = this.global.entityLib;

var shots = 0;

const bM = extend(MissileBulletType, {})
bM.bulletSprite = "shell";
bM.frontColor = Color.valueOf("f8ad42");
bM.backColor = Color.valueOf("f68021");
bM.trailColor = Color.valueOf("d06b53");
bM.speed = 3.9;
bM.damage = 720;
bM.splashDamageRadius = 120;
bM.splashDamage = 700;
bM.bulletWidth = 16;
bM.bulletHeight = 20;
bM.bulletShrink = 0
bM.keepVelocity = false;
bM.despawnEffect = Fx.flakExplosionBig;
bM.hitEffect = Fx.flakExplosionBig;
bM.lifetime = 104; //About 50 blocks travel distance.

const satelite = entityLib.extendUnit(HoverUnit, "bombardment", [{
    onShoot(e, num, e.x, e.y, e.rotation){
        shots ++;
        if(shots > 3){
            shots = 0;
            
            Bullet.create(bM, e, e.getTeam(), e.x, e.y, e.rotation);
            
            //shoot effect
            Draw.color(Color.valueOf("eba313"), Color.valueOf("f28a2e"), Color.valueOf("696969"), e.fin());
            Angles.randLenVectors(e.id, 10, e.finpow() * 70, e.rotation, 10, (x, y) => {
                Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.6);
            });
        }
    }
}]);