import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:flutter/material.dart';

class ThreeJsWebView extends StatefulWidget {
  const ThreeJsWebView({super.key});

  @override
  State<ThreeJsWebView> createState() => _ThreeJsWebViewState();
}

class _ThreeJsWebViewState extends State<ThreeJsWebView>{
  late InAppWebViewController webViewController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: InAppWebView(
                            initialFile: 'assets/web_code/model.html',
                            onLoadStop: (controller, url) async {},
                          ));
  }
}