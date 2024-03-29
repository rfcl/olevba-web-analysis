var sampleResults
async function uploadSample(sampleInput) {
    let formData = new FormData();
    let sample = sampleInput.parentElement.children[0].files[0];
    

    formData.append("sample", sample);

    const ctrl = new AbortController()    // timeout
    setTimeout(() => ctrl.abort(), 5000);

    try {
        let r = await fetch('/upload',
            { method: "POST", body: formData, signal: ctrl.signal }).then(response => {
                if (response.ok) {
                    sampleResponse = response.clone().json();
                    sampleResponse.then(function (r) {
                        sampleResults = r[1];
                        showAnalysis(sampleResults);
                    });
                }
            });
    } catch (e) {
        console.log('Huston we have problem...:', e);
    }

}

function showAnalysis(sampleResults) {
    $('#basic-analysis-table').DataTable().clear();
    $('#basic-analysis-table').DataTable().destroy();
    $('#macro-analysis-table').DataTable().clear();
    $('#macro-analysis-table').DataTable().destroy();
    document.getElementById('codeReview').innerText = "";
    

    basic_analysis_table = $('#basic-analysis-table').DataTable({
        "data": sampleResults['analysis'],
        "columns":  [
            { "data":"description", "width":"75%"},
            { "data": "keyword" },
            { "data": "type" }
        ],
        "pageLength": 17,
        "createdRow": function( row, data, dataIndex){
            if( data[2] ==  `Suspicious`){
                $(row).addClass('indicators_suspicious_red');
            }
        }
        });

    for (macro_id in sampleResults['macros']) {
        sampleResults['macros'][macro_id]['code'] = "<textarea style='display: none;'>" + sampleResults['macros'][macro_id]['code'] + "</textarea>"
    }
    
    macro_analysis_table = $('#macro-analysis-table').DataTable({
        "data": sampleResults['macros'],
        "columns": [
            { "data": "vba_filename" , "width":"30%"},
            { "data": "subfilename" },
            { "data": "ole_stream" },
            { "data": "code"}
        ]
    });

    allAnalysisElements = document.getElementsByClassName('analysis-results');
    
    document.getElementById('basic-analysis-table').style="width:100%";

    macro_table_rows = document.getElementById('macro-analysis-table').children[1].children;
    for (mr in macro_table_rows) {
        try {
            macroCode = macro_table_rows[mr].children[3].innerHTML;
            macro_table_rows[mr].children[3].innerHTML = "<a onClick='showCode(this)' style='text-decoration:underline; cursor: pointer;'>Click to review code" + macroCode + "</a>";
        } catch {
            continue
        }
            }

    for (el in allAnalysisElements) {
        document.getElementsByClassName('analysis-results')[el].style += "display:block; margin-top: 2em; width: 49%; float: left; ";
    }

    document.getElementById('macro-analysis-card').style ="display: block; margin-top: 2em; width: 49%; float: right;";

    basic_analysis_table.columns.adjust().draw();
}

function showCode(macroCodeElement) {
    document.getElementById('codeReview').innerText = macroCodeElement.children[0].innerText;
}