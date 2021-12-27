package com.hagan.github.crop;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import androidx.annotation.NonNull;

public class ImageCropModule extends ReactContextBaseJavaModule implements Crop {

    private CropImpl cropImpl;

    public ImageCropModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * @description 暴露原生模块的名字
     * @author HaganWu
     * @data 2021/12/27-13:31
     */
    @NonNull
    @Override
    public String getName() {
        return "ImageCrop";
    }

    /**
     * @description @ReactMethod注解来暴露接口 在js文件中通过ImageCrop.selectWithCrop来调用暴露给React Native的接口
     * @author HaganWu
     * @data 2021/12/27-13:30
     */
    @Override
    @ReactMethod
    public void selectWithCrop(int aspectX, int aspectY, Promise promise) {
        getCrop().selectWithCrop(aspectX, aspectY, promise);
    }

    /*@Override
    public void selectWithCrop(int outputX, int outputY, Callback callback) {
        getCrop().selectWithCrop(aspectX, aspectY, callback);
    }*/

    private CropImpl getCrop() {
        if (cropImpl == null) {
            cropImpl = CropImpl.of(getCurrentActivity());
            getReactApplicationContext().addActivityEventListener(cropImpl);
        } else {
            cropImpl.updateActivity(getCurrentActivity());
        }
        return cropImpl;
    }
}
