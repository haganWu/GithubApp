package com.hagan.github.crop;

import android.os.Environment;

import java.io.File;

/**
 * @author HaganWu
 * @description 原生模块开发
 * @fileName Utils.java
 * @data 2021/12/27-13:10
 */
public class Utils {

    /**
     * @description 获取一个临时文件
     * @author HaganWu
     * @data 2021/12/27-13:10
     */
    public static File getPhotoCacheDir(String fileName) {
        return new File(Environment.getExternalStorageDirectory().getAbsoluteFile(), fileName);
    }
}
