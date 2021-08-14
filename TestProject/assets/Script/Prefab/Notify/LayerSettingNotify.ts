import Manager from "../../Manager/Manager";
import BaseView from "../../Scene/BaseView";

/**
 * @classdesc 设置通知的脚本
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class LayerSettingNotify extends BaseView {


    ToggleMusic:cc.Node;
    ToggleSound:cc.Node;
    MusicCheckMark:cc.Node;
    SoundCheckMark:cc.Node

    init(){
        super.init();
        this.view_order = Manager.EnumManager.ViewType.TIPS;
        console.log(2222222222222);
    }

    onLoad () {
        this.ToggleMusic = this.GetChild("LayerSettingNotify/NodeMusic/ToggleMusic");
        this.ToggleSound = this.GetChild("LayerSettingNotify/NodeSound/ToggleSound");
        this.MusicCheckMark = this.GetChild("MusicCheckMark",this.ToggleMusic);
        this.SoundCheckMark = this.GetChild("SoundCheckMark",this.ToggleSound);
    }

    start(){
        super.start();
        console.log(11111111111111);
        if(Manager.DataManager.bIsOpenSound){
            this.ToggleSound.getComponent(cc.Toggle).isChecked = true;
            this.SoundCheckMark.active = true;
            this.SoundCheckMark.setPosition(55,0);
        }
        else{
            this.ToggleSound.getComponent(cc.Toggle).isChecked = false;
            this.SoundCheckMark.active = true;
            this.SoundCheckMark.setPosition(-55,0);
        }

        if(Manager.AudioManager.isPlayingBGM()){
            this.ToggleMusic.getComponent(cc.Toggle).isChecked = true;
            this.MusicCheckMark.active = true;
            this.MusicCheckMark.setPosition(55,0);
        }
        else{
            this.ToggleMusic.getComponent(cc.Toggle).isChecked = false;
            this.MusicCheckMark.active = true;
            this.MusicCheckMark.setPosition(-55,0);
        }
        
    }

    // update (dt) {}

    onClick_BtnClose(){
        Manager.AudioManager.isCanClick();
        Manager.ViewManager.hideView(Manager.EnumManager.ViewName.LayerSettingNotify);
    }

    /**
     * 音乐的处理
     */
    private checkMusic(){
        if(Manager.AudioManager.isPlayingBGM()){
            this.ToggleMusic.getComponent(cc.Toggle).isChecked = false;
            this.MusicCheckMark.active = true;
            this.MusicCheckMark.setPosition(-55,0);
            Manager.AudioManager.stopMusic();
        }
        else{
            this.ToggleMusic.getComponent(cc.Toggle).isChecked = true;
            this.MusicCheckMark.active = true;
            this.MusicCheckMark.setPosition(55,0);
            Manager.AudioManager.resumeBGM();
        }
    }

    /**
     * 音效的处理
     */
    private checkSound(){
        if(Manager.AudioManager.isSoundOpen()){
            this.ToggleSound.getComponent(cc.Toggle).isChecked = false;
            this.SoundCheckMark.active = true;
            this.SoundCheckMark.setPosition(-55,0);
            Manager.AudioManager.setSoundOpen(false);
            Manager.AudioManager.stopSound();
        }
        else{
            this.ToggleSound.getComponent(cc.Toggle).isChecked = true;
            this.SoundCheckMark.active = true;
            this.SoundCheckMark.setPosition(55,0);
            Manager.AudioManager.setSoundOpen(true);
            Manager.AudioManager.resumeSound();
        }
    }

    setEventListener(){
        this.ToggleMusic.on("toggle",this.checkMusic,this);
        this.ToggleSound.on("toggle",this.checkSound,this);
    }
}
