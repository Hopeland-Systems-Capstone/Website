import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
//import 'dart:html';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  //State<DashboardPage> createState() => _DashboardPageState();
  State<DashboardPage> createState() => _DashboardPageStateV2();
}

class _DashboardPageState extends State<DashboardPage> {
  Future<void> computeFuture = Future.value();
  @override
  Widget build(BuildContext context) {
    return Container(
        color: const Color.fromARGB(255, 245, 245, 245),
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
class _DashboardPageStateV2 extends State<DashboardPage> {
  Future<void> computeFuture = Future.value();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          //mainAxisAlignment: MainAxisAlignment.spaceBetween, //???
          children: <Widget>[
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                //mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Expanded(
                    child: Card(
                      shape: RoundedRectangleBorder(
                        side: BorderSide(
                          color: Theme.of(context).colorScheme.outline,
                        ),
                        borderRadius:
                            const BorderRadius.all(Radius.circular(12)),
                      ),
                      child: const Text(
                        'row 1',
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                  Expanded(
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: <Widget>[
                        Expanded(
                          child: Card(
                            child: Text(
                              'column 1',
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                        Expanded(
                          child: Card(
                            child: Text(
                              'column 1',
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
