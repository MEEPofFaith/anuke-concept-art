const spawnLoc = new Vec2();
const sumAngle = new Vec2();
var t = 1;
var ang = -45;

const necromancer = extendContent(UnitType, "necromancer", {});
necromancer.create(prov(() => new JavaAdapter(HoverUnit, {
  onDeath(){
    this.super$onDeath();
    for(var i = 0; i < 100; i ++){
      var randLocX = Mathf.range(60);
      var randLocY = Mathf.range(60);
      w = UnitTypes.wraith.create(this.getTeam());
      w.set(this.x + randLocX, this.y + randLocY);
      w.add();
      sumAngle.trns(Mathf.range(360), 24);
      w.velocity().set(sumAngle);
      if(this.isBoss()){
        w.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
      }
      Effects.effect(Fx.spawn, this.x + randLocX, this.y + randLocY);
      
      var randLocX = Mathf.range(60);
      var randLocY = Mathf.range(60);
      d = UnitTypes.dagger.create(this.getTeam());
      d.set(this.x + randLocX, this.y + randLocY);
      d.add();
      sumAngle.trns(Mathf.range(360), 24);
      d.velocity().set(sumAngle);
      if(this.isBoss()){
        d.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
      }
      Effects.effect(Fx.spawn, this.x + randLocX, this.y + randLocY);
    }
  },
  behavior(){
    this.super$behavior();
    
    if(this.target != null){
      if(!Units.invalidateTarget(this.target, this)){
        if(t++ >= 2){
          t = 0;
          ang += 5.625;
          ang = ang == 360 ? 0 : ang;
          
          for(i = 0; i < 2; i ++){
            spawnLoc.trns(this.rotation-90 + ang, 0, 60);
            wa = UnitTypes.wraith.create(this.getTeam());
            wa.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
            wa.add();
            sumAngle.trns(this.rotation-90 + ang, 16);
            wa.velocity().set(sumAngle);
            if(this.isBoss()){
              wa.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
            }
            Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
            
            spawnLoc.trns(this.rotation+90 + ang, 0, 60);
            wb = UnitTypes.wraith.create(this.getTeam());
            wb.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
            wb.add();
            sumAngle.trns(this.rotation-90 + ang, 16);
            wb.velocity().set(sumAngle);
            if(this.isBoss()){
              wb.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
            }
            Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
            
            spawnLoc.trns(this.rotation-90 - ang, 0, 60);
            da = UnitTypes.dagger.create(this.getTeam());
            da.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
            da.add();
            sumAngle.trns(this.rotation-90 + ang, 16);
            da.velocity().set(sumAngle);
            if(this.isBoss()){
              da.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
            }
            Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
            
            spawnLoc.trns(this.rotation+90 - ang, 0, 60);
            db = UnitTypes.dagger.create(this.getTeam());
            db.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
            db.add();
            sumAngle.trns(this.rotation-90 + ang, 16);
            db.velocity().set(sumAngle);
            if(this.isBoss()){
              db.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
            }
            Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
          }
        }
      }
    }
  }
})));