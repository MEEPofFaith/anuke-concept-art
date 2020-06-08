const spawnLoc = new Vec2();
const sumAngle = new Vec2();
var t = 1;
var ang = -45;

const necromancer = extendContent(UnitType, "necromancer", {});
necromancer.create(prov(() => new JavaAdapter(HoverUnit, {
  onDeath(){
    this.super$onDeath();
    for(var i = 0; i < 20; i ++){
      var randLocX = Mathf.range(60);
      var randLocY = Mathf.range(60);
      w = UnitTypes.wraith.create(this.getTeam());
      w.set(this.x + randLocX, this.y + randLocY);
      w.add();
      Effects.effect(Fx.spawn, this.x + randLocX, this.y + randLocY);
      
      var randLocX = Mathf.range(60);
      var randLocY = Mathf.range(60);
      d = UnitTypes.dagger.create(this.getTeam());
      d.set(this.x + randLocX, this.y + randLocY);
      d.add();
      Effects.effect(Fx.spawn, this.x + randLocX, this.y + randLocY);
    }
  },
  behavior(){
    this.super$behavior();
    
    if(this.target != null){
      if(!Units.invalidateTarget(this.target, this)){
        if(t++ >= 8){
          t = 0;
          ang += 22.5;
          ang = ang == 360 ? 0 : ang;
          
          spawnLoc.trns(this.rotation-90 + ang, 0, 60);
          wa = UnitTypes.wraith.create(this.getTeam());
          wa.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
          wa.add();
          sumAngle.trns(this.rotation-90 + ang, 2);
          wa.velocity().set(sumAngle);
          /*if(this.status == StatusEffects.boss){
            w.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
          }*/
          Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
          
          spawnLoc.trns(this.rotation+90 + ang, 0, 60);
          wb = UnitTypes.wraith.create(this.getTeam());
          wb.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
          wb.add();
          sumAngle.trns(this.rotation-90 + ang, 2);
          wb.velocity().set(sumAngle);
          /*if(this.status == StatusEffects.boss){
            w.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
          }*/
          Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
          
          spawnLoc.trns(this.rotation-90 - ang, 0, 60);
          da = UnitTypes.dagger.create(this.getTeam());
          da.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
          da.add();
          sumAngle.trns(this.rotation-90 + ang, 2);
          da.velocity().set(sumAngle);
          /*if(this.status == StatusEffects.boss){
            d.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
          }*/
          Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
          
          spawnLoc.trns(this.rotation+90 - ang, 0, 60);
          db = UnitTypes.dagger.create(this.getTeam());
          db.set(this.x + spawnLoc.x, this.y + spawnLoc.y);
          db.add();
          sumAngle.trns(this.rotation-90 + ang, 2);
          db.velocity().set(sumAngle);
          /*if(this.status == StatusEffects.boss){
            d.applyEffect(StatusEffects.boss, Number.MAX_VALUE);
          }*/
          Effects.effect(Fx.spawn, this.x + spawnLoc.x, this.y + spawnLoc.y);
        }
      }
    }
  }
})));