document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const errorDiv = document.getElementById('error');
    const scoreValue = document.getElementById('scoreValue');
    const scoreCircle = document.getElementById('scoreCircle');
    const findingsList = document.getElementById('findingsList');

    // Drag and drop handlers
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.name.endsWith('.zip')) {
            showError('Please upload a .zip file.');
            return;
        }

        uploadFile(file);
    }

    async function uploadFile(file) {
        // Reset UI
        results.classList.add('hidden');
        errorDiv.classList.add('hidden');
        loading.classList.remove('hidden');
        uploadArea.classList.add('hidden');

        const formData = new FormData();
        formData.append('extension_file', file);

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Analysis failed');
            }

            displayResults(data);
        } catch (err) {
            showError(err.message);
            uploadArea.classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    }

    // Preset buttons
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const presetId = btn.getAttribute('data-preset');
            loadPreset(presetId);
        });
    });

    async function loadPreset(presetId) {
        // Reset UI
        results.classList.add('hidden');
        errorDiv.classList.add('hidden');
        loading.classList.remove('hidden');
        uploadArea.classList.add('hidden');
        document.querySelector('.presets-area').classList.add('hidden');

        const formData = new FormData();
        formData.append('preset_id', presetId);

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Analysis failed');
            }

            displayResults(data);
        } catch (err) {
            showError(err.message);
            uploadArea.classList.remove('hidden');
            document.querySelector('.presets-area').classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    }

    function displayResults(data) {
        window.currentAnalysisData = data; // Store for modal access
        results.classList.remove('hidden');
        uploadArea.classList.remove('hidden'); // Allow new upload
        document.querySelector('.presets-area').classList.remove('hidden');

        // Update Name
        const nameSpan = document.getElementById('extensionName');
        if (nameSpan) {
            nameSpan.textContent = data.name || 'Unknown Extension';
        }

        // Update score with interpretable scale
        const score = data.threat_score;
        scoreValue.textContent = score;

        // Determine threat level and description
        let threatLevel, threatColor, threatDescription, scalePosition;
        if (score < 50) {
            threatLevel = 'Low Risk';
            threatColor = '#22c55e';
            threatDescription = 'Few concerning patterns detected';
            scalePosition = (score / 50) * 25; // 0-25% of scale
        } else if (score < 100) {
            threatLevel = 'Medium Risk';
            threatColor = '#f59e0b';
            threatDescription = 'Some potentially risky behaviors found';
            scalePosition = 25 + ((score - 50) / 50) * 25; // 25-50% of scale
        } else if (score < 200) {
            threatLevel = 'High Risk';
            threatColor = '#f97316';
            threatDescription = 'Multiple high-risk patterns identified';
            scalePosition = 50 + ((score - 100) / 100) * 25; // 50-75% of scale
        } else {
            threatLevel = 'Critical Risk';
            threatColor = '#ef4444';
            threatDescription = 'Severe security concerns detected';
            scalePosition = 75 + Math.min((score - 200) / 200, 1) * 25; // 75-100% of scale
        }

        scoreCircle.style.borderColor = threatColor;
        scoreCircle.style.color = threatColor;

        // Add threat level label below score
        const threatLevelLabel = document.getElementById('threatLevelLabel');
        if (threatLevelLabel) {
            threatLevelLabel.textContent = threatLevel;
            threatLevelLabel.style.color = threatColor;
        }

        // Add threat description
        const threatDesc = document.getElementById('threatDescription');
        if (threatDesc) {
            threatDesc.textContent = threatDescription;
        }

        // Update visual scale
        const scaleIndicator = document.getElementById('scaleIndicator');
        if (scaleIndicator) {
            scaleIndicator.style.left = `${scalePosition}%`;
            scaleIndicator.style.background = threatColor;
        }

        // Update ML Score with better formatting
        const mlCircle = document.getElementById('mlCircle');
        const mlValue = document.getElementById('mlValue');
        const mlLabel = document.getElementById('mlLabel');
        const mlFeatures = document.getElementById('mlFeatures');
        const mlFeaturesList = document.getElementById('mlFeaturesList');

        if (data.ml_analysis && data.ml_analysis.error === null) {
            const prob = data.ml_analysis.probability;
            const percent = Math.round(prob * 100);
            mlValue.textContent = percent + '%';
            mlLabel.textContent = data.ml_analysis.label;

            if (prob > 0.5) {
                mlCircle.style.borderColor = '#ef4444'; // Red
                mlCircle.style.color = '#ef4444';
                mlLabel.style.color = '#ef4444';
            } else {
                mlCircle.style.borderColor = '#22c55e'; // Green
                mlCircle.style.color = '#22c55e';
                mlLabel.style.color = '#22c55e';
            }

            // Natural language explanation removed - rely on categorized risk factors display

            // Display Risk Categories
            if (data.ml_analysis.risk_categories && data.ml_analysis.risk_categories.length > 0) {
                mlFeaturesList.innerHTML = '';

                // Add Baseline Risk Item
                if (data.ml_analysis.base_value && data.ml_analysis.base_value > 0.01) {
                    const baseLi = document.createElement('li');
                    baseLi.style.marginBottom = '8px';
                    baseLi.style.listStyle = 'none';

                    const baseHeader = document.createElement('div');
                    baseHeader.style.display = 'flex';
                    baseHeader.style.justifyContent = 'space-between';
                    baseHeader.style.alignItems = 'center';
                    baseHeader.style.padding = '8px 12px';
                    baseHeader.style.background = '#f1f5f9'; // Lighter gray
                    baseHeader.style.border = '1px solid #e2e8f0';
                    baseHeader.style.borderRadius = '6px';
                    baseHeader.style.cursor = 'help'; // Help cursor

                    const basePercent = (data.ml_analysis.base_value * 100).toFixed(1);

                    baseHeader.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-weight: 600; color: #475569;">Baseline Risk</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">${basePercent}% Impact</span>
                        </div>
                    `;

                    // Tooltip/Modal for Baseline
                    baseHeader.title = "The average malicious probability across all extensions in the dataset. This represents the starting risk level before considering specific features.";

                    baseLi.appendChild(baseHeader);
                    mlFeaturesList.appendChild(baseLi);
                }

                data.ml_analysis.risk_categories.forEach(cat => {
                    // Category Item
                    const catLi = document.createElement('li');
                    catLi.style.marginBottom = '8px';
                    catLi.style.listStyle = 'none';

                    // Category Header
                    const header = document.createElement('div');
                    header.style.display = 'flex';
                    header.style.justifyContent = 'space-between';
                    header.style.alignItems = 'center';
                    header.style.padding = '8px 12px';
                    header.style.background = '#f8fafc';
                    header.style.border = '1px solid #e2e8f0';
                    header.style.borderRadius = '6px';
                    header.style.cursor = 'pointer';
                    header.style.transition = 'all 0.2s';

                    const catName = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
                    const impactPercent = (cat.impact * 100).toFixed(1);

                    // Color based on impact
                    let impactColor = '#64748b';
                    if (cat.impact > 0.1) impactColor = '#ef4444';
                    else if (cat.impact > 0.05) impactColor = '#f97316';
                    else if (cat.impact > 0.01) impactColor = '#eab308';

                    header.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-weight: 600; color: #334155;">${catName} Risk</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 0.85rem; font-weight: 600; color: ${impactColor};">${impactPercent}% Impact</span>
                            <span class="toggle-arrow" style="font-size: 0.8rem; color: #94a3b8;">▼</span>
                        </div>
                    `;

                    // Features List (Hidden by default)
                    const featuresUl = document.createElement('ul');
                    featuresUl.style.display = 'none';
                    featuresUl.style.padding = '8px 0 8px 16px';
                    featuresUl.style.margin = '0';
                    featuresUl.style.borderLeft = '2px solid #e2e8f0';
                    featuresUl.style.marginLeft = '12px';

                    cat.features.forEach(feat => {
                        const featLi = document.createElement('li');
                        featLi.style.padding = '4px 0';
                        featLi.style.cursor = 'pointer';
                        featLi.style.fontSize = '0.9rem';
                        featLi.style.color = '#475569';

                        const severityColors = {
                            'critical': '#dc2626',
                            'high': '#ea580c',
                            'medium': '#ca8a04',
                            'low': '#65a30d'
                        };
                        const badgeColor = severityColors[feat.severity || 'medium'] || '#6b7280';

                        featLi.innerHTML = `
                            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${badgeColor}; margin-right: 8px;"></span>
                            ${feat.feature || 'Unknown Feature'}
                        `;

                        featLi.addEventListener('mouseenter', () => featLi.style.color = '#1e293b');
                        featLi.addEventListener('mouseleave', () => featLi.style.color = '#475569');

                        featLi.addEventListener('click', (e) => {
                            e.stopPropagation();
                            showRiskFactorModal(feat);
                        });

                        featuresUl.appendChild(featLi);
                    });

                    // Toggle Logic - Fixed to preserve category name
                    header.addEventListener('click', () => {
                        const isHidden = featuresUl.style.display === 'none';
                        featuresUl.style.display = isHidden ? 'block' : 'none';
                        header.style.background = isHidden ? '#f1f5f9' : '#f8fafc';
                        const arrow = header.querySelector('.toggle-arrow');
                        if (arrow) arrow.textContent = isHidden ? '▲' : '▼';
                    });

                    catLi.appendChild(header);
                    catLi.appendChild(featuresUl);
                    mlFeaturesList.appendChild(catLi);
                });

                // Display Benign Factors (Mitigating)
                if (data.ml_analysis.benign_categories && data.ml_analysis.benign_categories.length > 0) {
                    // Divider
                    const divider = document.createElement('li');
                    divider.style.margin = '16px 0 8px 0';
                    divider.style.borderBottom = '1px dashed #e2e8f0';
                    mlFeaturesList.appendChild(divider);

                    const benignHeader = document.createElement('li');
                    benignHeader.innerHTML = '<span style="font-size: 0.85rem; font-weight: 600; color: #16a34a; text-transform: uppercase; letter-spacing: 0.05em;">Mitigating Factors (Safe)</span>';
                    benignHeader.style.marginBottom = '8px';
                    mlFeaturesList.appendChild(benignHeader);

                    data.ml_analysis.benign_categories.forEach(cat => {
                        // Category Item
                        const catLi = document.createElement('li');
                        catLi.style.marginBottom = '8px';
                        catLi.style.listStyle = 'none';

                        // Category Header
                        const header = document.createElement('div');
                        header.style.display = 'flex';
                        header.style.justifyContent = 'space-between';
                        header.style.alignItems = 'center';
                        header.style.padding = '8px 12px';
                        header.style.background = '#f0fdf4'; // Light green
                        header.style.border = '1px solid #dcfce7';
                        header.style.borderRadius = '6px';
                        header.style.cursor = 'pointer';
                        header.style.transition = 'all 0.2s';

                        const catName = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
                        const impactPercent = (cat.impact * 100).toFixed(1);

                        header.innerHTML = `
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-weight: 600; color: #15803d;">${catName} Factors</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 0.85rem; font-weight: 600; color: #16a34a;">-${impactPercent}% Risk</span>
                                <span class="toggle-arrow" style="font-size: 0.8rem; color: #86efac;">▼</span>
                            </div>
                        `;

                        // Features List (Hidden by default)
                        const featuresUl = document.createElement('ul');
                        featuresUl.style.display = 'none';
                        featuresUl.style.padding = '8px 0 8px 16px';
                        featuresUl.style.margin = '0';
                        featuresUl.style.borderLeft = '2px solid #dcfce7';
                        featuresUl.style.marginLeft = '12px';

                        cat.features.forEach(feat => {
                            const featLi = document.createElement('li');
                            featLi.style.padding = '4px 0';
                            featLi.style.cursor = 'pointer';
                            featLi.style.fontSize = '0.9rem';
                            featLi.style.color = '#475569';

                            featLi.innerHTML = `
                                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; margin-right: 8px;"></span>
                                ${feat.feature || 'Unknown Feature'}
                            `;

                            featLi.addEventListener('mouseenter', () => featLi.style.color = '#1e293b');
                            featLi.addEventListener('mouseleave', () => featLi.style.color = '#475569');

                            featLi.addEventListener('click', (e) => {
                                e.stopPropagation();
                                showRiskFactorModal(feat);
                            });

                            featuresUl.appendChild(featLi);
                        });

                        // Toggle Logic - Fixed to preserve category name
                        header.addEventListener('click', () => {
                            const isHidden = featuresUl.style.display === 'none';
                            featuresUl.style.display = isHidden ? 'block' : 'none';
                            header.style.background = isHidden ? '#dcfce7' : '#f0fdf4';
                            const arrow = header.querySelector('.toggle-arrow');
                            if (arrow) arrow.textContent = isHidden ? '▲' : '▼';
                        });

                        catLi.appendChild(header);
                        catLi.appendChild(featuresUl);
                        mlFeaturesList.appendChild(catLi);
                    });
                }

                mlFeatures.classList.remove('hidden');
            } else if (data.ml_analysis.top_features && data.ml_analysis.top_features.length > 0) {
                // Fallback to old display if risk_categories is missing
                mlFeaturesList.innerHTML = '';
                data.ml_analysis.top_features.forEach(feat => {
                    const li = document.createElement('li');
                    li.style.cursor = 'pointer';
                    li.style.transition = 'background 0.2s';

                    // Severity badge
                    const severityColors = {
                        'critical': '#dc2626',
                        'high': '#ea580c',
                        'medium': '#ca8a04',
                        'low': '#65a30d'
                    };
                    const badgeColor = severityColors[feat.severity || 'medium'] || '#6b7280';

                    li.innerHTML = `
                        <span style="display: inline-block; padding: 2px 6px; border-radius: 3px; background: ${badgeColor}; color: white; font-size: 0.7rem; margin-right: 6px; font-weight: 600;">
                            ${(feat.severity || 'MEDIUM').toUpperCase()}
                        </span>
                        ${feat.feature || 'Unknown Feature'} (Impact: ${feat.importance.toFixed(3)})
                    `;

                    li.addEventListener('mouseenter', () => {
                        li.style.background = '#f3f4f6';
                    });
                    li.addEventListener('mouseleave', () => {
                        li.style.background = 'transparent';
                    });

                    li.addEventListener('click', () => {
                        showRiskFactorModal(feat);
                    });

                    mlFeaturesList.appendChild(li);
                });
                mlFeatures.classList.remove('hidden');
            } else {
                mlFeatures.classList.add('hidden');
            }

        } else {
            mlValue.textContent = 'N/A';
            mlLabel.textContent = 'Error';
            mlCircle.style.borderColor = '#9ca3af'; // Gray
            mlCircle.style.color = '#9ca3af';
            mlFeatures.classList.add('hidden');
        }

        // ====== Display Metadata ======
        if (data.analysis_metadata) {
            const meta = data.analysis_metadata;

            // Basic extension info
            document.getElementById('extensionVersion').textContent = meta.version || 'Unknown';
            document.getElementById('manifestVersion').textContent = `v${meta.manifest_version || 'Unknown'}`;
            document.getElementById('jsFileCount').textContent = meta.total_js_files || '0';
            document.getElementById('totalFindings').textContent = meta.total_findings || '0';

            // Analysis metadata
            document.getElementById('analyzerVersion').textContent = meta.analyzer_version || 'Unknown';
            document.getElementById('analysisDuration').textContent = meta.analysis_duration_seconds
                ? `${meta.analysis_duration_seconds}s`
                : '-';
            document.getElementById('errorCount').textContent = meta.error_count || '0';

            // Timestamp (format nicely)
            if (meta.timestamp) {
                const date = new Date(meta.timestamp);
                document.getElementById('analysisTimestamp').textContent = date.toLocaleString();
            } else {
                document.getElementById('analysisTimestamp').textContent = '-';
            }

            // Content hash (truncate for display but show full in tooltip)
            if (meta.content_hash) {
                const hashEl = document.getElementById('contentHash');
                hashEl.textContent = meta.content_hash;
                hashEl.title = `Full hash: ${meta.content_hash}`;
            } else {
                document.getElementById('contentHash').textContent = '-';
            }

            // Display severity summary if available
            if (meta.severity_summary) {
                const summary = meta.severity_summary;
                document.getElementById('criticalCount').textContent = summary.Critical || 0;
                document.getElementById('highCount').textContent = summary.High || 0;
                document.getElementById('mediumCount').textContent = summary.Medium || 0;
                document.getElementById('lowCount').textContent = summary.Low || 0;

                // Show summary section if there are any risk findings
                if (data.risk_impact_analysis && data.risk_impact_analysis.length > 0) {
                    document.getElementById('severitySummary').classList.remove('hidden');
                }
            }
        }

        // ====== JSON Export Functionality ======
        const exportBtn = document.getElementById('exportJsonBtn');
        if (exportBtn) {
            // Remove any existing listeners to avoid duplicates
            const newExportBtn = exportBtn.cloneNode(true);
            exportBtn.parentNode.replaceChild(newExportBtn, exportBtn);

            newExportBtn.addEventListener('click', () => {
                // Create blob from data
                const jsonStr = JSON.stringify(data, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);

                // Create download link
                const a = document.createElement('a');
                a.href = url;
                const filename = `extension_analysis_${data.extension_id}_${Date.now()}.json`;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                // Visual feedback
                const originalText = newExportBtn.textContent;
                newExportBtn.textContent = '✓ Downloaded!';
                newExportBtn.style.background = '#22c55e';
                setTimeout(() => {
                    newExportBtn.textContent = originalText;
                    newExportBtn.style.background = '#2563eb';
                }, 2000);
            });
        }

        // ====== PHASE 2: SCORE BREAKDOWN VISUALIZATION ======
        const scoreBreakdownSection = document.getElementById('scoreBreakdownSection');

        if (data.threat_score !== undefined) {
            // Show the section
            scoreBreakdownSection.style.display = 'block';

            // Populate raw vs normalized comparison
            document.getElementById('rawScore').textContent = data.raw_score || data.threat_score;
            document.getElementById('sizeFactor').textContent = (data.size_factor || 1.0).toFixed(3);
            document.getElementById('normalizedScore').textContent = data.threat_score;
            document.getElementById('filesAnalyzed').textContent = data.total_js_files || data.analysis_metadata?.total_js_files || '-';

            // Populate capability vs behavior split
            const capScore = data.capability_score || 0;
            const behScore = data.behavior_score || 0;
            const total = capScore + behScore || 1; // Avoid division by zero

            document.getElementById('capabilityScore').textContent = capScore;
            document.getElementById('behaviorScore').textContent = behScore;

            // Update visual bars
            const capPercent = (capScore / total * 100);
            const behPercent = (behScore / total * 100);

            const capabilityBar = document.getElementById('capabilityBar');
            const behaviorBar = document.getElementById('behaviorBar');

            capabilityBar.style.width = `${capPercent}%`;
            behaviorBar.style.width = `${behPercent}%`;
            capabilityBar.textContent = capPercent > 15 ? `${Math.round(capPercent)}%` : '';
            behaviorBar.textContent = behPercent > 15 ? `${Math.round(behPercent)}%` : '';

            // Populate category breakdown table
            if (data.breakdown && Object.keys(data.breakdown).length > 0) {
                // Category descriptions for natural language explanation
                const categoryDescriptions = {
                    'dangerous_dom': 'Modifications to page content that could inject malicious HTML',
                    'data_exfiltration': 'Attempts to send data to external servers',
                    'manifest_permission': 'Risky permissions requested in the extension manifest',
                    'obfuscation': 'Code designed to hide its true purpose',
                    'suspicious_call': 'Function calls commonly used by malicious extensions',
                    'dynamic_execution': 'Code that executes dynamically generated content',
                    'credential_theft': 'Attempts to capture login credentials or sensitive data',
                    'network_request': 'External network communication patterns',
                    'host_access': 'Broad access to website content',
                    'csp_bypass': 'Attempts to bypass security policies'
                };

                const tableHtml = `
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                        <thead>
                            <tr style="background: #e2e8f0; text-align: left;">
                                <th style="padding: 8px; border: 1px solid #cbd5e1;">Category</th>
                                <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Score</th>
                                <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">Count</th>
                                <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">% of Total</th>
                                <th style="padding: 8px; border: 1px solid #cbd5e1;" title="How much of the maximum possible risk for this category has been reached">Saturation</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(data.breakdown).map(([category, info]) => {
                    const percent = info.percentage || 0;
                    const saturation = (info.score / info.max_possible * 100) || 0;
                    const categoryKey = category.toLowerCase().replace(/ /g, '_');
                    const description = categoryDescriptions[categoryKey] || '';
                    const displayName = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    return `
                                    <tr style="border-bottom: 1px solid #e2e8f0;">
                                        <td style="padding: 8px; border: 1px solid #cbd5e1;">
                                            <div style="font-weight: 500;">${displayName}</div>
                                            ${description ? `<div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">${description}</div>` : ''}
                                        </td>
                                        <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #ef4444;">${info.score}</td>
                                        <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">${info.count}</td>
                                        <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: 600;">${percent.toFixed(1)}%</td>
                                        <td style="padding: 8px; border: 1px solid #cbd5e1;" title="Score ${info.score} out of maximum ${info.max_possible} for this category (${saturation.toFixed(0)}% saturated)">
                                            <div style="background: #e2e8f0; height: 20px; border-radius: 10px; overflow: hidden;">
                                                <div style="background: linear-gradient(90deg, #10b981, #059669); height: 100%; width: ${saturation}%; transition: width 0.3s ease;"></div>
                                            </div>
                                            <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">${info.score}/${info.max_possible} (${saturation.toFixed(0)}%)</div>
                                        </td>
                                    </tr>
                                `;
                }).join('')}
                        </tbody>
                    </table>
                    <p style="font-size: 0.75rem; color: #64748b; margin-top: 8px; font-style: italic;">
                        Saturation shows how much of the maximum possible risk for each category has been reached. 
                        Higher saturation means more findings in that category relative to what's detectable.
                    </p>
                `;
                document.getElementById('categoryBreakdownTable').innerHTML = tableHtml;
            } else {
                document.getElementById('categoryBreakdownTable').innerHTML = '<p style="color: #64748b; font-style: italic;">No category breakdown available</p>';
            }
        }

        // ====== Display Enhanced Risk Import Analysis ======
        const riskImpactSection = document.getElementById('riskImpactSection');
        const riskImpactList = document.getElementById('riskImpactList');

        // Store risk items globally for filtering
        window.currentRiskItems = [];

        if (data.risk_impact_analysis && data.risk_impact_analysis.length > 0) {
            riskImpactList.innerHTML = '';
            riskImpactSection.classList.remove('hidden');

            // Severity color mapping
            const severityConfig = {
                'Critical': { color: '#dc2626', bg: '#fef2f2', borderColor: '#fecaca' },
                'High': { color: '#ea580c', bg: '#fff7ed', borderColor: '#fed7aa' },
                'Medium': { color: '#ca8a04', bg: '#fefce8', borderColor: '#fef08a' },
                'Low': { color: '#65a30d', bg: '#f7fee7', borderColor: '#d9f99d' }
            };

            data.risk_impact_analysis.forEach((risk, index) => {
                const severity = risk.severity || 'Medium';
                const config = severityConfig[severity] || severityConfig['Medium'];

                const riskItem = document.createElement('div');
                riskItem.className = 'risk-item'; // Add class for filtering
                riskItem.dataset.severity = severity; // Store severity for filtering
                riskItem.style.cssText = `
                    margin-bottom: 12px;
                    border: 1px solid ${config.borderColor};
                    border-radius: 8px;
                    overflow: hidden;
                    background: white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                `;

                // Risk Header (Always Visible)
                const header = document.createElement('div');
                header.style.cssText = `
                    padding: 12px 16px;
                    background: ${config.bg};
                    cursor: pointer;
                    transition: background 0.2s;
                `;

                header.innerHTML = `
                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                        <span style="
                            display: inline-block;
                            padding: 4px 8px;
                            border-radius: 4px;
                            background: ${config.color};
                            color: white;
                            font-size: 0.75rem;
                            font-weight: 600;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            flex-shrink: 0;
                        ">${severity}</span>
                        ${risk.confidence !== undefined ? `
                            <span style="
                                display: inline-block;
                                padding: 4px 8px;
                                border-radius: 4px;
                                background: ${risk.confidence >= 0.7 ? '#10b981' : risk.confidence >= 0.5 ? '#f59e0b' : '#ef4444'};
                                color: white;
                                font-size: 0.7rem;
                                font-weight: 600;
                                flex-shrink: 0;
                                cursor: help;
                            " title="Confidence: ${(risk.confidence * 100).toFixed(0)}% - Higher confidence means less likely to be false positive">
                                ${(risk.confidence * 100).toFixed(0)}% conf
                            </span>
                        ` : ''}
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: #1e293b; margin-bottom: 4px;">${risk.title || 'Unknown Risk'}</div>
                            <div style="color: #475569; font-size: 0.9rem; line-height: 1.6;">${risk.impact || 'No description available.'}</div>
                        </div>
                        <span style="color: #94a3b8; font-size: 0.9rem; flex-shrink: 0;" class="toggle-icon">▼</span>
                    </div>
                `;

                // Technical Details (Expandable)
                const detailsDiv = document.createElement('div');
                detailsDiv.style.cssText = `
                    display: none;
                    padding: 16px;
                    background: #f8fafc;
                    border-top: 1px solid ${config.borderColor};
                `;

                let detailsHTML = '';

                if (risk.details) {
                    if (risk.details.technical) {
                        detailsHTML += `
                            <div style="margin-bottom: 12px;">
                                <div style="font-weight: 600; color: #334155; margin-bottom: 6px; font-size: 0.85rem;">Technical Details:</div>
                                <div style="color: #475569; font-size: 0.85rem; line-height: 1.7;">${risk.details.technical}</div>
                            </div>
                        `;
                    }

                    if (risk.details.locations && risk.details.locations.length > 0) {
                        detailsHTML += `
                            <div style="margin-bottom: 8px;">
                                <div style="font-weight: 600; color: #334155; margin-bottom: 6px; font-size: 0.85rem;">
                                    Found in ${risk.details.count || risk.details.locations.length} location(s):
                                </div>
                                <ul style="margin: 0; padding-left: 20px; color: #64748b; font-size: 0.8rem; font-family: monospace;">
                                    ${risk.details.locations.map(loc => `<li style="margin: 2px 0;">${loc}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }

                    if (risk.details.category) {
                        detailsHTML += `
                            <div style="display: inline-block; padding: 4px 8px; background: #e2e8f0; border-radius: 4px; font-size: 0.75rem; color: #475569; margin-top: 8px;">
                                Category: ${risk.details.category}
                            </div>
                        `;
                    }
                }

                if (!detailsHTML) {
                    detailsHTML = '<div style="color: #94a3b8; font-size: 0.85rem; font-style: italic;">No additional technical details available.</div>';
                }

                detailsDiv.innerHTML = detailsHTML;

                // Toggle expandable details
                header.addEventListener('click', () => {
                    const isHidden = detailsDiv.style.display === 'none';
                    detailsDiv.style.display = isHidden ? 'block' : 'none';
                    header.querySelector('.toggle-icon').textContent = isHidden ? '▲' : '▼';
                });

                header.addEventListener('mouseenter', () => {
                    header.style.background = config.color + '15';
                });
                header.addEventListener('mouseleave', () => {
                    header.style.background = config.bg;
                });

                riskItem.appendChild(header);
                riskItem.appendChild(detailsDiv);
                riskImpactList.appendChild(riskItem);

                // Store reference for filtering
                window.currentRiskItems.push(riskItem);
            });

            // ====== Add Filter Functionality ======
            const filterButtons = document.querySelectorAll('.filter-btn');
            const severityCards = document.querySelectorAll('.severity-card');

            function filterRisks(severity) {
                window.currentRiskItems.forEach(item => {
                    if (severity === 'all' || item.dataset.severity === severity) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Update active button
                filterButtons.forEach(btn => {
                    if (btn.dataset.filter === severity) {
                        btn.classList.add('active');
                        btn.style.background = '#1e293b';
                        btn.style.color = 'white';
                    } else {
                        btn.classList.remove('active');
                        btn.style.background = 'white';
                        const colors = {
                            'Critical': '#dc2626',
                            'High': '#ea580c',
                            'Medium': '#ca8a04',
                            'Low': '#65a30d'
                        };
                        btn.style.color = colors[btn.dataset.filter] || '#1e293b';
                    }
                });
            }

            // Filter button click handlers
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterRisks(btn.dataset.filter);
                });
            });

            // Severity card click handlers
            severityCards.forEach(card => {
                card.addEventListener('click', () => {
                    const severity = card.dataset.severity;
                    filterRisks(severity);
                    // Scroll to risk impact section
                    riskImpactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });

        } else {
            riskImpactSection.classList.add('hidden');
        }

        // Update findings with code snippets
        findingsList.innerHTML = '';

        if (data.threat_report && data.threat_report.length > 0) {
            data.threat_report.forEach(finding => {
                const li = document.createElement('li');
                li.textContent = finding;
                findingsList.appendChild(li);
            });

            // Add detailed findings with code snippets
            if (data.detailed_findings && data.detailed_findings.javascript) {
                data.detailed_findings.javascript.forEach(finding => {
                    if (finding.code_snippet && !finding.code_snippet.error) {
                        const li = document.createElement('li');
                        li.style.cursor = 'pointer';
                        li.style.wordBreak = 'break-word';

                        // Extract just the filename from the full path
                        const fullPath = finding.file || '';
                        const filename = fullPath.split('/').pop() || fullPath;

                        li.innerHTML = `
                            <strong>${finding.type}:</strong> ${finding.value} 
                            <span style="color: #6b7280;" title="${fullPath}">in ${filename}:${finding.line}</span>
                            <div class="code-snippet" style="display: none; margin-top: 8px; padding: 8px; background: #1e293b; color: #e2e8f0; border-radius: 4px; font-family: monospace; font-size: 0.75rem; overflow-x: auto; white-space: pre;">
${finding.code_snippet.snippet}
                            </div>
                        `;

                        li.addEventListener('click', function () {
                            const snippet = this.querySelector('.code-snippet');
                            snippet.style.display = snippet.style.display === 'none' ? 'block' : 'none';
                        });

                        findingsList.appendChild(li);
                    }
                });
            }
        } else {
            const li = document.createElement('li');
            li.textContent = 'No significant threats found.';
            li.style.background = '#f0fdf4';
            li.style.borderLeftColor = '#22c55e';
            li.style.color = '#15803d';
            findingsList.appendChild(li);
        }
    }

    function showRiskFactorModal(feat) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px;';

        const modal = document.createElement('div');
        modal.style.cssText = 'background: white; border-radius: 12px; max-width: 600px; width: 100%; padding: 24px; max-height: 80vh; overflow-y: auto;';

        const severityColors = {
            'critical': '#dc2626',
            'high': '#ea580c',
            'medium': '#ca8a04',
            'low': '#65a30d'
        };
        const badgeColor = severityColors[feat.severity || 'medium'] || '#6b7280';
        const safeDescription = feat.description || 'No detailed description available.';
        const safeCategory = feat.category || 'unknown';
        const safeSeverity = (feat.severity || 'medium').toUpperCase();

        modal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                <h2 style="margin: 0; font-size: 1.5rem; color: #1e293b;">${feat.feature || 'Unknown Feature'}</h2>
                <button id="closeModal" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280;">&times;</button>
            </div>
            <div style="margin-bottom: 16px;">
                <span style="display: inline-block; padding: 4px 12px; border-radius: 6px; background: ${badgeColor}; color: white; font-size: 0.875rem; font-weight: 600;">
                    ${safeSeverity} SEVERITY
                </span>
                <span style="display: inline-block; padding: 4px 12px; border-radius: 6px; background: #e5e7eb; color: #374151; font-size: 0.875rem; margin-left: 8px;">
                    ${safeCategory}
                </span>
            </div>
            <div style="background: #f9fafb; border-left: 4px solid ${badgeColor}; padding: 16px; border-radius: 6px; margin-bottom: 16px;">
                <p style="margin: 0; line-height: 1.6; color: #374151;">${safeDescription}</p>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #6b7280; font-size: 0.875rem;">STATISTICAL IMPACT</p>
                <p style="margin: 0 0 8px 0; color: #374151;">This specific feature contributed <strong>${(feat.importance * 100).toFixed(2)}%</strong> to the malicious probability score.</p>
                ${window.currentAnalysisData && window.currentAnalysisData.ml_analysis.category_impacts ? `
                <p style="margin: 0; color: #6b7280; font-size: 0.85rem;">
                    Total impact of all <strong>${safeCategory}</strong> features: 
                    <strong>${(window.currentAnalysisData.ml_analysis.category_impacts[safeCategory] * 100).toFixed(2)}%</strong>
                </p>
                ` : ''}
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close modal handlers
        const closeModal = () => {
            document.body.removeChild(overlay);
        };
        modal.querySelector('#closeModal').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }

    function showError(msg) {
        errorDiv.textContent = msg;
        errorDiv.classList.remove('hidden');
    }
});
