const entityLib = this.global.entityLib;

//Side missiles bullets
const sM = extend(MissileBulletType, {})
sM.bulletSprite = "shell";
sM.frontColor = Color.valueOf("f8ad42");
sM.backColor = Color.valueOf("f68021");
sM.trailColor = Color.valueOf("d06b53");
sM.speed = 2.7;
sM.damage = 12;
sM.splashDamageRadius = 28;
sM.splashDamage = 11;
sM.bulletWidth = 8;
sM.bulletHeight = 8;
sM.bulletShrink = 0;
sM.drag = -0.02;
sM.keepVelocity = true;
sM.weaveScale = 6;
sM.weaveMag = 2;
sM.hitEffect = Fx.blastExplosion;
sM.despawnEffect = Fx.blastExplosion;
sM.lifetime = 150; //About 50 blocks travel distance.

//Center super bomb bullet
const bM = extend(MissileBulletType, {})
bM.bulletSprite = "shell";
bM.frontColor = Color.valueOf("f8ad42");
bM.backColor = Color.valueOf("f68021");
bM.trailColor = Color.valueOf("d06b53");
bM.speed = 1.3;
bM.damage = 280;
bM.splashDamageRadius = 60;
bM.splashDamage = 260;
bM.bulletWidth = 16;
bM.bulletHeight = 20;
bM.bulletShrink = 0
bM.keepVelocity = false;
bM.hitEffect = Fx.blastExplosion;
bM.despawnEffect = Fx.blastExplosion;
bM.lifetime = 312; //About 50 blocks travel distance.

const missileLauncher = extendContent(Weapon, "multilauncher", realLoad);
missileLauncher.name = "missile-launcher";
missileLauncher.bullet = sM;
missileLauncher.reload = 160;
missileLauncher.width = 27;
missileLauncher.length = -3;
missileLauncher.shots = 4;
missileLauncher.spacing = 0;
missileLauncher.inaccuracy = 0.5;
missileLauncher.alternate = false;
missileLauncher.velocityRnd = 0.2;
missileLauncher.shootSound = "missile";
missileLauncher.shotDelay = 6

const bombardmentMissile = extendContent(Weapon, "multilauncher", realLoad);
bombardmentMissile.name = "underbelly-cannon";
bombardmentMissile.bullet = bM;
bombardmentMissile.reload = 920;
bombardmentMissile.width = 0;
bombardmentMissile.length = 4;
bombardmentMissile.shots = 1;
bombardmentMissile.inaccuracy = 0.1;
bombardmentMissile.alternate = true;
bombardmentMissile.velocityRnd = 0.1;
bombardmentMissile.shootSound = "orbitalblast";

const satelite = entityLib.extendUnit(Unit, "bombardment", [{
  loadAfter(){
    this.body = Core.atlas.find(this.name)
    this.wing = Core.atlas.find(this.name + "-wing")
  }
  drawAbove(unit, rot) {
    Draw.rect(this.body, player.x, player.y, rot);
  }
  drawUnder(unit, rot) {
    Draw.rect(this.wing, player.x, player.y, rot);
  }
}]);
satelite.weapons = [missileLauncher, bombardmentMissile];