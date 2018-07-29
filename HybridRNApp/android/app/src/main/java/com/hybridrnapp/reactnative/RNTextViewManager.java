package com.hybridrnapp.reactnative;

import android.widget.TextView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;


public class RNTextViewManager extends SimpleViewManager<TextView> {

    private static final String RN_TEXT_VIEW = "AndroidTextView";

    private TextView textView;
    @Override
    public String getName() {
        return RN_TEXT_VIEW;
    }

    @Override
    protected TextView createViewInstance(ThemedReactContext reactContext) {
        textView = new TextView(reactContext);
        textView.setAllCaps(true);
        return textView;
    }


    @ReactProp(name = "title")
    public void setText(TextView textView, String text) {
        textView.setText(text);
    }
}


