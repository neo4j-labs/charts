import React from 'react'
import { useState } from 'react'
import ExportToNeo4j from './ExportToNeo4j'
import ImportFromNeo4j from './ImportFromNeo4j'

export default function ExportForm() {
    const colour = 'blue'

    const [ showMenu, setShowMenu ] = useState<boolean>(false)
    const [ showLoadFromNeo4jForm, setShowLoadFromNeo4jForm ] = useState<boolean>(false)
    const [ showExportToNeo4jForm, setShowExportToNeo4jForm ] = useState<boolean>(false)

    const hideMenu = () => setShowMenu(false)
    const showLoadFromNeo4j = () => {
        setShowLoadFromNeo4jForm(true)
        hideMenu()
    }
    const hideLoadFromNeo4j = () => {
        setShowLoadFromNeo4jForm(false)
        hideMenu()
    }

    const showSaveToNeo4j = () => {
        setShowExportToNeo4jForm(true)
        hideMenu()
    }
    const hideSaveToNeo4j = () => {
        setShowExportToNeo4jForm(false)
        hideMenu()
    }

    return (
        <div>
            {showExportToNeo4jForm && <ExportToNeo4j onClose={hideSaveToNeo4j} />}
            {showLoadFromNeo4jForm && <ImportFromNeo4j onClose={hideLoadFromNeo4j} />}

            {showMenu && <div className={`fixed text-sm border border-${colour}-200 bottom-0 right-0 mr-4 p-1 bg-white text-${colour}-800 rounded-md`} style={{marginBottom: '64px'}}>
                <a className="cursor-pointer block p-2 text-blue-600 text-right" onClick={() => showLoadFromNeo4j()}>Load From Neo4j</a>
                <a className="cursor-pointer block p-2 text-blue-600 text-right" onClick={() => showSaveToNeo4j()}>Save to Neo4j</a>
                {/* <a className="cursor-pointer block p-2 text-blue-600 text-right" onClick={() => showSaveJson()}>Export Dashboard as JSON</a> */}

                <div style={{position: 'absolute', bottom: -8, right: '18px', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #e2e8f0'}}></div>
            </div>}

            <div className={`fixed bottom-0 right-0 mx-4 -mb-2 p-2 pt-4 rounded-md shadow-md bg-${colour}-200 text-${colour}-800 stroke-${colour}-600`} style={{ width: '46px', height: '65px' }}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" className="m-auto cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                        <g id="cog-1" stroke="#000000">
                            <path d="M19.922,7.213 C19.6941046,7.69202131 19.6799007,8.24518632 19.8829118,8.73527226 C20.0859229,9.22535819 20.4871277,9.60644606 20.987,9.784 L22.252,10.234 C23.0000302,10.4994999 23.4998349,11.2072498 23.4998349,12.001 C23.4998349,12.7947502 23.0000302,13.5025001 22.252,13.768 L20.987,14.218 C20.4871277,14.3955539 20.0859229,14.7766418 19.8829118,15.2667277 C19.6799007,15.7568137 19.6941046,16.3099787 19.922,16.789 L20.5,18 C20.8424413,18.7170161 20.6957457,19.5720213 20.1338835,20.1338835 C19.5720213,20.6957457 18.7170161,20.8424413 18,20.5 L16.787,19.924 C16.3079787,19.6961046 15.7548137,19.6819007 15.2647277,19.8849118 C14.7746418,20.0879229 14.3935539,20.4891277 14.216,20.989 L13.766,22.254 C13.5000881,23.0013024 12.7927024,23.500428 11.9995,23.500428 C11.2062976,23.500428 10.4989119,23.0013024 10.233,22.254 L9.783,20.989 C9.60521975,20.4890625 9.22394163,20.0878576 8.73370104,19.8848614 C8.24346045,19.6818652 7.69016476,19.6960868 7.211,19.924 L6,20.5 C5.28294662,20.8437921 4.42699596,20.6976004 3.86469776,20.1353022 C3.30239957,19.573004 3.15620795,18.7170534 3.5,18 L4.076,16.787 C4.3038954,16.3079787 4.31809933,15.7548137 4.11508823,15.2647277 C3.91207714,14.7746418 3.51087231,14.3935539 3.011,14.216 L1.746,13.766 C0.997969789,13.5005001 0.49816505,12.7927502 0.49816505,11.999 C0.49816505,11.2052498 0.997969789,10.4974999 1.746,10.232 L3.011,9.782 C3.51033807,9.60437688 3.91111575,9.22362414 4.11407782,8.73403771 C4.31703989,8.24445128 4.3032052,7.69181758 4.076,7.213 L3.5,6 C3.15620795,5.28294662 3.30239957,4.42699596 3.86469776,3.86469776 C4.42699596,3.30239957 5.28294662,3.15620795 6,3.5 L7.213,4.076 C7.69169965,4.30331054 8.2442335,4.31744047 8.73392585,4.11489457 C9.22361819,3.91234867 9.60473407,3.51204378 9.783,3.013 L10.233,1.748 C10.4989119,1.00069761 11.2062976,0.501571993 11.9995,0.501571993 C12.7927024,0.501571993 13.5000881,1.00069761 13.766,1.748 L14.216,3.013 C14.3935539,3.51287231 14.7746418,3.91407714 15.2647277,4.11708823 C15.7548137,4.32009933 16.3079787,4.3058954 16.787,4.078 L18,3.5 C18.7170161,3.15755865 19.5720213,3.30425435 20.1338835,3.86611652 C20.6957457,4.4279787 20.8424413,5.28298387 20.5,6 L19.922,7.213 Z" id="Shape"></path>
                            <circle id="Oval" cx="11.999" cy="12.001" r="4.5"></circle>
                        </g>
                    </g>
                </svg>
            </div>

        </div>
    )
}