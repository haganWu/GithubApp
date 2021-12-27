package com.hagan.github.crop;

import com.facebook.react.bridge.Promise;

/**
 * @author HaganWu
 * @description Android原生模块
 * @fileName Crop.java
 * @data 2021/12/27-11:59
 */
    public interface Crop {

        /**
         * @description 选取并裁剪照片
         * @author HaganWu
         * @data 2021/12/27-12:00
         */
        void selectWithCrop(int outputX, int outputY, Promise promise);

    //    void selectWithCrop(int outputX, int outputY, Callback callback);
    }
