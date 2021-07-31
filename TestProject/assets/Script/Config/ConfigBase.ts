/**
 * Config配置的顶层类
 */

export class ConfigBase {


    /** 全部数据集合 */
    public static configMap: Map<string, any> = new Map<string, any>();

    /**
     * 初始化json数据，保存到map中
     * @param jsonData json对象
     */
    public static initData(jsonData: Object){
        this.configMap = new Map();
        for (const key in jsonData) {
            if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
                if(key === "c"){
                    continue;
                }
                let data = jsonData[key];
                let config:any = this.serData(data);
                this.configMap.set(key,config);
            }
        }
    }

    /**
     * 为json中的每条数据赋值
     * @param obj json数据中的每一条数据
     * @returns 该条数据
     */
    private static serData(obj: object) {
        let config: any = new this();
        for (let key in obj) {
            config[key] = obj[key];
        }
        return config;
    }
}