# olevba-web-analysis
The very early stages of a web interface for olevba (from ***oletools*** by ***@decalage2***). No guarantees or warranties included, use at your own risk, code is not high quality but it works.

![olevba_screen](https://user-images.githubusercontent.com/28194115/138216913-0f630e43-be9a-4101-ac31-19b2e669bf67.png)


## Current Features
At present, the following features are implemented:
- Sample upload and automatic processing with olevba.
- Web output of all analysis features to sortable and searchable DataTables.
- Web output of all macros identified by olevba analysis to sortable and searchable DataTables.
- Ability to review VBA macro code safely within browser.
- Support for the the following file types supported by olevba including: 
  - **Word:** Word 97-2003 (.doc, .dot), Word 2007+ (.docm, .dotm)
  - **Excel:** Excel 97-2003 (.xls), Excel 2007+ (.xlsm, .xlsb) 
  - **PowerPoint:** PowerPoint 97-2003 (.ppt), PowerPoint 2007+ (.pptm, .ppsm) 
  - **Other** 
  -  Word/PowerPoint 2007+ XML (aka Flat OPC) Word 2003 XML (.xml) Word/Excel Single File Web Page / MHTML (.mht) Publisher (.pub) 
  - SYLK/SLK files (.slk) 
  - Text file containing VBA or VBScript source code.

## Future Features
Features planned for future released include:
- Storage of analysis results in searchable database.
- Additional oletools analysis outputs.
- Integration with VirusTotal, AlienVault, Hatching Triage, etc.
- Document visual preview.
- Syntax highlight and fixes to formatting in Code Review section.

## Installation

### Requirements
- Python 3+
- Golang 1.17+
- oletools

### Setup Instructions
- Install **Golang** and **Python** if required, as well as **pip** package installer for Python.
- Install **oletools** using the instructions provided by **decalage2** (https://github.com/decalage2/oletools)
  - On Linux/Mac: **sudo -H pip install -U oletools**
  - On Windows: **pip install -U oletools**
- Download project, build, and run (ensure that you are able to bind to and access port 8080 on localhost):
    - **git clone https://github.com/rfcl/olevba-web-analysis.git**
    - **cd olevba-web-analysis**
    - **go build olevba_web.go**
    - **./olevba(.exe)**

### Known Bugs
- Page reload required to upload additional samples.
