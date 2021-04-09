import 'package:flutter/material.dart';

class Home extends StatelessWidget {
    @override
    Widget build(BuildContext context){
        return Text(
                "Helleo World",
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
                style:TextStyle(fontWeight: FontWeight.bold)
              );
    }

}