                         
import 'package:flutter/material.dart';
import 'package:model_navigation/three_js.dart';

main() {

  runApp(MaterialApp(
        theme: ThemeData(fontFamily: 'Gilroy', colorScheme: ColorScheme.fromSeed(seedColor: Colors.white, primary: Colors.black)),
        debugShowCheckedModeBanner: false,
        home: ThreeJsWebView(),
        ));
}
