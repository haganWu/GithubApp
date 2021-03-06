package com.hagan.github.crop;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;

/**
 * @author HaganWu
 * @description 原生模块开发
 * @fileName IntentUtils.java
 * @data 2021/12/27-12:08
 */
public class IntentUtils {
    /**
     * 获取选择照片的Intent
     *
     * @return
     */
    public static Intent getPickIntentWithGallery() {
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_PICK);//Pick an item from the data
        intent.setType("image/*");//从所有图片中进行选择
        return intent;
    }

    /**
     * 获取裁切照片的Intent
     *
     * @param targetUri 要裁切的照片
     * @param outPutUri 裁切之后输出的照片
     * @param aspectX   宽
     * @param aspectY   高
     * @return
     */
    public static Intent getCropIntentWith(Uri targetUri, Uri outPutUri, int aspectX, int aspectY) {
        Intent intent = new Intent("com.android.camera.action.CROP");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.setDataAndType(targetUri, "image/*");
        intent.putExtra("crop", "true");
        intent.putExtra("aspectX", aspectX);
        intent.putExtra("aspectY", aspectY);
        intent.putExtra("scale", true);
        intent.putExtra(MediaStore.EXTRA_OUTPUT, outPutUri);
        intent.putExtra("outputFormat", Bitmap.CompressFormat.JPEG.toString());
        intent.putExtra("noFaceDetection", true); // no face detection
        return intent;
    }
}
