import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
//import 'package:window_size/window_size.dart';

import 'dashboard_page.dart';

void main() {
  setupWindow();
  runApp(
    const MaterialApp(
      home: HomePage(),
    ),
  );
}

const double windowWidth = 1024;
const double windowHeight = 800;

const primaryColor = Color.fromARGB(255, 83, 126, 76);

void setupWindow() {
  if (!kIsWeb && (Platform.isWindows || Platform.isLinux || Platform.isMacOS)) {
    WidgetsFlutterBinding.ensureInitialized();
    //setWindowTitle('Isolate Example');
    //setWindowMinSize(const Size(windowWidth, windowHeight));
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: primaryColor,
      ),
      home: DefaultTabController(
        length: 4,
        child: Scaffold(
          appBar: AppBar(
            backgroundColor: primaryColor,
            bottom: const TabBar(
              tabs: [
                Tab(
                  icon: Icon(Icons.home_outlined),
                  text: 'Dashboard',
                ),
                Tab(
                  icon: Icon(Icons.gas_meter_outlined),
                  text: 'Devices',
                ),
                Tab(
                  icon: Icon(Icons.storage),
                  text: 'Reports',
                ),
                Tab(
                  icon: Icon(Icons.person),
                  text: 'Me',
                ),
              ],
            ),
            title: const Text('Hopeland Systems Test App'),
          ),
          /*
          body: const TabBarView(
            children: [
              DashboardPage(),
              
            ],
          ),
          */
        ),
      ),
    );
  }
}
