//------------------------------------------------------------------
//title: 注入工具
//author: zc
//date:
//desc:当前值添加全局单例模式注入 动态对象直接走 new
//------------------------------------------------------------------

export default class Inject {
  constructor() {
    this._classMap = new Map();
  }
  
  /**
   * 获得注入的class
   */
  static getClass(value, ...props) {
    const _this = Inject.getInstance();
    const path = _this.getInjectPath(value) ;
    if (_this._classMap.has(path)) {
      let _re = _this._classMap.get(path);
      if (_re._constructor && props.length > 0)
        _re._constructor(...props);
      return _re;
    }
    let _nc = new value(...props);
    _this._classMap.set(path, _nc);
    return _nc;
  }
  
  
  /**
   *  简单做个唯一标识
   * @param value
   * @returns {string}
   */
   getInjectPath(value) {
    if (value.prototype.__class)
      return value.prototype.__class;
    if (!Inject.objRandom)
      Inject.objRandom = {max: 9999999, ct: 0};
    Inject.objRandom.ct += 1;
    if (Inject.objRandom.ct >= Inject.objRandom.ct.max)
      Inject.objRandom.ct = 0;
    value.prototype.__class = `${value.name}.class.${new Date().getTime()}.${parseInt(Math.random()*1000)}.${Inject.objRandom.ct}`;
    return value.prototype.__class;
  }
  
  /**
   * 删除class
   */
  static removeClass(value) {
    if (!value.prototype.hasOwnProperty("__class"))
      return null ;
    const _this = Inject.getInstance() ;
    if (_this._classMap.has(value.prototype.__class))
      return _this._classMap.delete(value);
    return null ;
  }
  
  static getInstance() {
    if (!Inject._instance)
      Inject._instance = new Inject();
    return Inject._instance;
  }
}
