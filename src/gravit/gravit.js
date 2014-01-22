(function (_) {
    /**
     * Gravit Core Module
     * @class GModule
     * @constructor
     * @extends EXModule
     */
    function GModule() {
    }
    GObject.inherit(GModule, EXModule);

    /** @override */
    GModule.prototype.init = function () {
// Register default storages
        gExpress.storages.push(
            new GFileStorage()
        );

        // Register default palettes
        gExpress.palettes.push(
            new EXColorMixerPalette(),
            new EXColorMatcherPalette(),
            new EXColorTrendsPalette(),
            new EXPropertiesPalette(),
            new EXPagesPalette(),
            new EXLayersPalette()
        );

        // Register default tools
        gExpress.tools.push(
            new GXPointerTool(),
            new GXSubSelectTool(),
            new GXPageTool(),
            new GXLassoTool(),
            new GXRectSelectTool(),
            new GXEllipseSelectTool(),
            new GXPenTool(),
            new GXBezigonTool(),
            new GXLineTool(),
            new GXRectangleTool(),
            new GXEllipseTool(),
            new GXPolygonTool(),
            new GXZoomTool(),
            new GXHandTool()
        );

        // Register default color matcher
        gExpress.colorMatchers.push(
            new EXAnalogousMatcher(),
            new EXComplementaryMatcher(),
            new EXImagePaletteMatcher()
        );

        // Register default properties
        gExpress.properties.push(
            new EXDimensionsProperties(),
            new EXPolygonProperties()
        );

        // Register default actions
        gExpress.actions = gExpress.actions.concat(this._createDefaultActions());
    };

    /**
     * @returns {Array<GAction>}
     * @private
     */
    GModule.prototype._createDefaultActions = function () {
        // Collect all storages and create our open
        // and saveAs actions out of it here
        var openActions = [];
        var saveAsActions = [];

        var hasDefaultOpen = false;
        var hasDefaultSave = false;
        for (var i = 0; i < gExpress.storages.length; ++i) {
            var storage = gExpress.storages[i];
            if (storage.isAvailable() && storage.isPrompting()) {
                openActions.push(new EXOpenAction(storage, !hasDefaultOpen));
                hasDefaultOpen = true;

                if (storage.isSaving()) {
                    saveAsActions.push(new EXSaveAsAction(storage, !hasDefaultSave));
                    hasDefaultSave = true;
                }
            }
        }

        // Collect all import and export filters and add actions for 'em
        var importActions = [];
        var exportActions = [];

        for (var i = 0; i < gExpress.importers.length; ++i) {
            importActions.push(new EXImportAction(gExpress.importers[i]));
        }
        for (var i = 0; i < gExpress.exporters.length; ++i) {
            exportActions.push(new EXExportAction(gExpress.exporters[i]));
        }

        // Collect all palettes and add actions for 'em
        var paletteShowActions = [];
        for (var i = 0; i < gExpress.palettes.length; ++i) {
            paletteShowActions.push(new EXShowPaletteAction(gExpress.palettes[i]));
        }

        // TODO : If there's only one storage available,
        // don't put open/saveAs actions in sub-categories file.open/file.saveAs

        return [].concat(
            // File
            new EXNewAction(),
            openActions,

            new EXSaveAction(),
            saveAsActions,
            new EXSaveAllAction(),

            importActions,
            exportActions,

            new EXCloseAction(),
            new EXCloseAllAction(),

            // Edit
            new EXUndoAction(),
            new EXRedoAction(),
            new EXDeleteAction(),

            new EXDuplicateSelectionAction(),
            new EXCloneSelectionAction(),

            // View
            new EXOriginalViewAction(),
            new EXFitSelectionAction(),
            new EXFitCurrentPageAction(),
            new EXFitCurrentLayerAction(),
            new EXFitAllAction(),
            new EXMagnificationAction(6, null),
            new EXMagnificationAction(12, null),
            new EXMagnificationAction(25, null),
            new EXMagnificationAction(50, [GUIKey.Constant.META, '5']),
            new EXMagnificationAction(100, [GUIKey.Constant.META, '1']),
            new EXMagnificationAction(200, [GUIKey.Constant.META, '2']),
            new EXMagnificationAction(400, [GUIKey.Constant.META, '4']),
            new EXMagnificationAction(800, [GUIKey.Constant.META, '8']),
            new EXZoomInAction(),
            new EXZoomOutAction(),

            new EXPaintModeAction(GXScenePaintConfiguration.PaintMode.Full),
            new EXPaintModeAction(GXScenePaintConfiguration.PaintMode.Fast),
            new EXPaintModeAction(GXScenePaintConfiguration.PaintMode.Outline),
            new EXPaintModeAction(GXScenePaintConfiguration.PaintMode.Output),

            new EXPixelPreviewAction(),
            new EXSinglePageModeAction(),

            new EXShowRulersAction(),

            // Window
            new EXNewWindowAction(),
            new EXShowSidebarAction(),
            new EXShowToolsAction(),
            paletteShowActions,

            // Help
            new EXShortcutMapAction()
        );
    };

    /** @override */
    GModule.prototype.toString = function () {
        return '[Module Gravit]';
    };

    gExpress.modules.push(new GModule());
})(this);