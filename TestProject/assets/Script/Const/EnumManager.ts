export default class EnumManager {
    //场景管理者唯一实例
    private static _instance: EnumManager = null;

    private constructor(){}

    /**
     * 将场景管理者制作为单例模式
     */
    public static get instance(): EnumManager {
        if (!this._instance) {
            this._instance = new EnumManager();
        }
        return this._instance;
    }

    /**
    * 视图的路径名字
    */
    public ViewName = {
        LoadingScene:"Prefab/LoadingScene",
        MainScene:"Prefab/MainScene",
    }

    /**
     * 五层弹窗的分布zIndex数值
     */
    public ViewType = {
        CONTENT : 10000,//游戏内容层
        TIPS : 20000,//提示性信息，弹窗
        GUIDE : 30000,//新手引导层
        ALERT : 40000,//显示系统级别的弹窗，错误，比如断网，掉线
        LOADING : 50000,//加载，读取界面层
    }

    /**
     * 资源目录
     */
    public ResourceDir = {
        Json:"Json/"
    }

    /**
     * Json数据表的名字
     */
    public JsonDataName = {
        PrefabData:"PrefabData",
    }

    /**
     * 音乐和音效的路径和名称
     */
    public AudioPath = {
        bgm:"Audio/BGM",
        buttonSound:"Audio/dianji"
    }

    public AssetName = {
        AnimationClip : 'cc_AnimationClip',
        ParticleAsset : 'cc_ParticleAsset',
        TiledMapAsset : 'cc_TiledMapAsset',
        Mesh : 'cc_Mesh',
        AudioClip : 'cc_AudioClip',
        Font : 'cc_Font',
        JsonAsset : 'cc_JsonAsset',
        Prefab : 'cc_Prefab',
        SceneAsset : 'cc_SceneAsset',
        SpriteAtlas : 'cc_SpriteAtlas',
        SpriteFrame : 'cc_SpriteFrame',
        TextAsset : 'cc_TextAsset',
        Texture2D : 'cc_Texture2D',
        Material : 'cc_Material',
    
        DragonBonesAsset : 'cc_DragonBonesAsset',
        DragonBonesAtlasAsset : 'cc_DragonBonesAtlasAsset',
    }
}