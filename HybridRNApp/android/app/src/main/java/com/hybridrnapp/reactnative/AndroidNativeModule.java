package com.hybridrnapp.reactnative;

import android.app.Activity;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.joda.time.DateTime;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class AndroidNativeModule extends ReactContextBaseJavaModule {

    private ReactContext mContext;

    public AndroidNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "AndroidNativeModule";
    }

    @ReactMethod
    public void jumpToNativeView() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            currentActivity.finish();
        }
    }

    @ReactMethod
    public void passStringBackToRN(Callback callback) {
        callback.invoke("android - " + DateTime.now().toString("MM/DD hh:mm:ss"));
    }


    @ReactMethod
    public void getStringFromReactNative(String stringFromRN) {
        Toast.makeText(mContext, stringFromRN, Toast.LENGTH_SHORT).show();
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> params = new HashMap<>();
        params.put("CustomConstant", "CustomConstant from android ");
        return params;
    }

    @ReactMethod
    public void getDictionaryFromRN(ReadableMap readableMapFromRN) {
        System.out.print(readableMapFromRN);
        Toast.makeText(mContext, "Return map: " + readableMapFromRN.toString(), Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void passDictionaryBackToRN(Callback callback) {
        WritableMap map = Arguments.createMap();
        map.putString("name", "ccl");
        map.putInt("age", 20);
        callback.invoke(map);
    }

    @ReactMethod
    public void passPromiseBackToRN(String msg, Promise promise) {
        if (!msg.equals("")) {
            promise.resolve(true);
        } else {
            promise.reject("warning", "msg cannot be empty!");
        }
    }


    public void sendEvent(String eventName) {
        String dataToRN = "String from native";
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, dataToRN);
    }

}
