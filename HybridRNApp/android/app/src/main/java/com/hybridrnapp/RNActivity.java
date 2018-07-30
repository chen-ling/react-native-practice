package com.hybridrnapp;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;
import com.hybridrnapp.reactnative.ReactNativePackage;

import java.util.Arrays;

public class RNActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    private static final String NATIVE_EVENT_LISTENER = "nativeEventListener";
    private static final String BRAND_NAME = "brandName";
    private static final String RESULT = "result";
    private final String TAG = getClass().getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModulePath("index")
                .addPackages(Arrays.<ReactPackage>asList(
                        new MainReactPackage(),
                        new ReactNativePackage()
                ))
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager,
                "HybridRNApp", null);

        setContentView(mReactRootView);

        WritableMap params = Arguments.createMap();
        params.putString(BRAND_NAME, "Brand Name yo");
        params.putString(RESULT, "Should be api response");
        sendEvent(mReactInstanceManager.getCurrentReactContext(), NATIVE_EVENT_LISTENER, params);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
        if (mReactRootView != null) {
            mReactRootView.unmountReactApplication();
        }
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    public void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap passingParam) {
        if (reactContext == null) {
            Log.e(TAG, "sendEvent reactContext == null");
        } else {
            mReactInstanceManager.getCurrentReactContext().getJSModule(
                    DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, passingParam);
        }
    }

}
