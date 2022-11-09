import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'dart:html';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
  //State<DashboardPage> createState() => _DashboardPageState_V2();
}

class _DashboardPageState extends State<DashboardPage> {
  Future<void> computeFuture = Future.value();
  @override
  Widget build(BuildContext context) {
    return Container(
        color: Color.fromARGB(255, 245, 245, 245),
        child: Html(
          data: htmlData,
          tagsList: Html.tags,
          style: {
            ".content-area": Style(
                //backgroundColor: Color.fromARGB(255, 245, 245, 245),
                ),
            ".alerts-area": Style(
              //border: Border(top: BorderSide(color: Colors.purple)),
              fontFamily: 'IBMPlexSans',
            ),
            ".activitylevel-area": Style(
              fontFamily: 'IBMPlexSans',
            ),
            ".status-area": Style(
              fontFamily: 'IBMPlexSans',
            ),
          },
        ));
  }
}

const htmlData = r"""
  <div class="col py-3 content-area"> <!-- contains all the content of the dashboard -->
    <div class="col-4 alerts-area">
      <h3>Alerts</h3>
    </div>
    <div class="col-8 activitylevel-area">
      <h3>Activity Level</h3>
    </div>
    <div class="col-8 status-area">
      <h3>Status</h3>
    </div>
  </div>
""";

// ------------ An version of the page not using HTML ----------//
class _DashboardPageState_V2 extends State<DashboardPage> {
  Future<void> computeFuture = Future.value();
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
