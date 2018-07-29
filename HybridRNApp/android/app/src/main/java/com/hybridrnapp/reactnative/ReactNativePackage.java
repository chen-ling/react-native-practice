package com.hybridrnapp.reactnative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;


public class ReactNativePackage implements ReactPackage {

    @Override
    public List<com.facebook.react.bridge.NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<com.facebook.react.bridge.NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(new AndroidNativeModule(reactContext));
        return nativeModules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> nativeModules = new ArrayList<>();
        nativeModules.add(new RNTextViewManager());
        return nativeModules;
    }
}