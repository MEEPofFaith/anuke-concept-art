const spawnLoc = new Vec2();
const sumAngle = new Vec2();
const randLoc = new Vec2();
var t = 1;
var ang = -45;

const necromancer = extendContent(UnitType, "necromancer", {});
necromancer.create(prov(() => new JavaAdapter(HoverUnit, {
  onDeath(){
    this.super$onDeath();
    for(var i = 0; i < 100; i ++){
      randLoc.trns(Mathf.range(360), 0, Mathf.range(60));
      w = UnitTypes.wraith.create(this.getTeam());
      w.set(this.x + randLoc.x, this.y + randLoc.y);
      w.add();
      sumAngle.trns(Mathf.range(360), 24);
      w.rotation(sumAngle);
      if(this.isBoss()){
        w.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
      }
      Effects.effect(Fx.spawn, this.x + randLoc.x, this.y + randLoc.y);
      
      randLoc.trns(Mathf.range(360), 0, Mathf.range(60));
      d = UnitTypes.dagger.create(this.getTeam());
      d.set(this.x + randLoc.x, this.y + randLoc.y);
      d.add();
      sumAngle.trns(Mathf.range(360), 24);
      d.rotation(sumAngle);
      if(this.isBoss()){
        d.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
      }
      Effects.effect(Fx.spawn, this.x + randLoc.x, this.y + randLoc.y);
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
            wa.rotation(sumAngle);
            if(this.isBoss()){
              wa.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
            }
            Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
            
            spawnLoc.trns(this.rotation+90 + ang, 0, 60);
            wb = UnitTypes.wraith.create(this.getTeam());
            wb.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
            wb.add();
            sumAngle.trns(this.rotation-90 + ang, 16);
            wb.rotation(sumAngle);
            if(this.isBoss()){
              wb.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
            }
            Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
            
            spawnLoc.trns(this.rotation-90 - ang, 0, 60);
            da = UnitTypes.dagger.create(this.getTeam());
            da.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
            da.add();
            sumAngle.trns(this.rotation-90 + ang, 16);
            da.rotation(sumAngle);
            if(this.isBoss()){
              da.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
            }
            Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
            
            spawnLoc.trns(this.rotation+90 - ang, 0, 60);
            db = UnitTypes.dagger.create(this.getTeam());
            db.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
            db.add();
            sumAngle.trns(this.rotation-90 + ang, 16);
            db.rotation(sumAngle);
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