package com.hagan.github.crop;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

/**
 * @author HaganWu
 * @description Android原生模块
 * @fileName CropImpl.java
 * @data 2021/12/27-12:02
 */
public class CropImpl implements ActivityEventListener, Crop {

    private final int RC_READ = 50001;
    private final int RC_PICK = 50081;
    private final int RC_CROP = 50082;
    private final String CODE_ERROR_PICK = "用户取消";
    private final String CODE_ERROR_CROP = "裁切失败";

    private Promise pickPromise;

    //    private Callback errorCallback;
//    private Callback successCallback;
    private Uri outPutUri;
    private int aspectX;
    private int aspectY;
    private Activity activity;

    public static CropImpl of(Activity activity) {
        return new CropImpl(activity);
    }

    private CropImpl(Activity activity) {
        this.activity = activity;
    }

    public void updateActivity(Activity activity) {
        this.activity = activity;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == RC_PICK) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                //相册返回
                outPutUri = Uri.fromFile(Utils.getPhotoCacheDir(System.currentTimeMillis() + ".jpg"));
                //裁剪图片
                onCrop(data.getData(), outPutUri);
            } else {
                pickPromise.reject(CODE_ERROR_PICK, "没有获取到结果");
//                errorCallback.invoke(CODE_ERROR_CROP,"没有获取到结果");
            }
        } else if (requestCode == RC_CROP) {
            if (resultCode == Activity.RESULT_OK) {
                pickPromise.resolve(outPutUri.getPath());
//                successCallback.invoke(outPutUri.getPath());
            } else {
                pickPromise.reject(CODE_ERROR_CROP, "裁剪失败");
//                errorCallback.invoke(CODE_ERROR_CROP,"裁剪失败");
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    /**
     * @description 需要将此方法暴露给RN以供JS调用
     * Promise 用于回调 (也可使用Callback 进行回调 , Promise和Callback 只能调用一次,只能向JS中传递一次数据)
     * @author HaganWu
     * @data 2021/12/27-13:21
     */
    @Override
    public void selectWithCrop(int outputX, int outputY, Promise promise) {
        this.pickPromise = promise;
        this.aspectX = outputX;
        this.aspectY = outputY;
        checkPermission();
    }

    /**
     *
     //JS 调用
     ImageCrop.selectWithCrop(parseInt(x), parseInt(y)).then((result: any) => {
         setRestult(result['imageUrl'] ? result['imageUrl'] : result)
         }).catch((e: any) => {
         setRestult(e);
     });

     或

     async onSelectCrop() {
         var result=await ImageCrop.selectWithCrop(parseInt(x),parseInt(y));
     }
     *
     */

   /* @Override
    public void selectWithCrop(int outputX, int outputY, Callback callback) {
        this.errorCallback = errorCallback;
        this.successCallback = successCallback;
        this.aspectX = aspectX;
        this.aspectY = aspectY;
        checkPermission();
    }

        ImageCrop.selectWithCrop(parseInt(x),parseInt(y),(error)=>{
          console.log(error);
        },(result)=>{
          console.log(result);
        })

    */


    /**
     *
     原生:
     原生向JS多次传递数据,通过RCTDeviceEventEmitter(原生模块和js之间的一个事件发射器)实现:
     private void sendEvent(ReactContext reactContext,String eventName, @Nullable WritableMap params) {
     reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
     .emit(eventName, params);
     }
     eventName是我们要发送事件的事件名 params是此次事件所携带的数据


     JS:
     JS模块中监听事件:
     componentDidMount() {
        //注册扫描监听
       DeviceEventEmitter.addListener('onScanningResult',this.onScanningResult);
     }
     onScanningResult = (e)=> {
     this.setState({
     scanningResult: e.result,
     });
     }

     移除监听：
     componentWillUnmount(){
        DeviceEventEmitter.removeListener('onScanningResult',this.onScanningResult);//移除扫描监听
     }


     */


    /**
     * @description 检查权限
     * @author HaganWu
     * @data 2021/12/27-12:08
     */
    private void checkPermission() {
        if (ContextCompat.checkSelfPermission(this.activity, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
            this.activity.startActivityForResult(IntentUtils.getPickIntentWithGallery(), RC_PICK);
        } else {
            ActivityCompat.requestPermissions(this.activity, new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, RC_READ);
            Toast.makeText(this.activity, "请开启存储权限后在继续", Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * @description 裁剪图片
     * @author HaganWu
     * @data 2021/12/27-13:14
     */
    private void onCrop(Uri targetUri, Uri outputUri) {
        this.activity.startActivityForResult(IntentUtils.getCropIntentWith(targetUri, outPutUri, aspectX, aspectY), RC_CROP);
    }
}
