/**
 * jQuery org-chart/tree plugin.
 *
 * Author: Wes Nolte
 * http://twitter.com/wesnolte
 *
 * Based on the work of Mark Lee
 * http://www.capricasoftware.co.uk
 *
 * Copyright (c) 2011 Wesley Nolte
 * Dual licensed under the MIT and GPL licenses.
 *
 */
(function($) {

    $.fn.jOrgChart = function(options) {
        var opts = $.extend({}, $.fn.jOrgChart.defaults, options);
        var $appendTo = $(opts.chartElement);

        // build the tree
        $this = $(this);
        var $container = $("<div class='" + opts.chartClass + "'/>");
        if($this.is("ul")) {
            buildNode($this.find("li:first"), $container, 0, opts);
        }
        else if($this.is("li")) {
            buildNode($this, $container, 0, opts);
        }
        $appendTo.append($container);
    };

    // Option defaults
    $.fn.jOrgChart.defaults = {
        chartElement : 'body',
        depth      : -1,
        chartClass : "jOrgChart",
        dragAndDrop: false
    };

    var nodeCount = 0;
    // Method that recursively builds the tree
    function buildNode($node, $appendTo, level, opts) {
        var $table = $("<table cellpadding='0' cellspacing='0' border='0' class='level"+level+"'></table>");
        var $tbody = $("<tbody/>");

        // Construct the node container(s)
        var $nodeRow = $("<tr/>").addClass("node-cells");
        var $nodeCell = $("<td/>").addClass("node-cell").attr("colspan", 2);
        var $childNodes = $node.children("ul:first").children("li");
        var $nodeDiv;

        if($childNodes.length > 1) {
            $nodeCell.attr("colspan", $childNodes.length * 2);
        }

        // Draw the node
        // Get the contents - any markup except li and ul allowed
        var $nodeContent = $node.clone().children("ul,li").remove().end().html();
        var $nodeId = $node.data('id') || '';

        //Increaments the node count which is used to link the source list and the org chart
        nodeCount++;
        $node.data("tree-node", nodeCount);
        $nodeDiv = $("<div>").addClass("node").data("tree-node", nodeCount).append($nodeContent);
        $nodeDiv.addClass('node_'+ $nodeId);

        $nodeCell.append($nodeDiv);
        $nodeRow.append($nodeCell);
        $tbody.append($nodeRow);

        if($childNodes.length > 0 && level < 1)
        {
            // recurse until leaves found (-1) or to the level specified
            if(opts.depth == -1 || (level+1 < opts.depth)) {
                var $downLineRow = $("<tr/>");
                var $downLineCell = $("<td/>").attr("colspan", $childNodes.length*2);
                $downLineRow.append($downLineCell);

                // draw the connecting line from the parent node to the horizontal line
                $downLine = $("<div class='level"+ level +"'></div>").addClass("line down");
                $downLineCell.append($downLine);
                $tbody.append($downLineRow);

                // Draw the horizontal lines
                var $linesRow = $("<tr/>");
                $childNodes.each(function() {
                    var $left = $("<td>&nbsp;</td>").addClass("line left top");
                    var $right = $("<td>&nbsp;</td>").addClass("line right top");
                    $linesRow.append($left).append($right);
                });

                // horizontal line shouldn't extend beyond the first and last child branches
                $linesRow.find("td:first").removeClass("top").end().find("td:last").removeClass("top");

                $tbody.append($linesRow);
                var $childNodesRow = $("<tr/>");
                $childNodes.each(function() {
                    var $td = $("<td class='node-container'/>");
                    $td.attr("colspan", 2);
                    buildNode($(this), $td, level+1, opts);
                    $childNodesRow.append($td);
                });
                $tbody.append($childNodesRow);
            }
        }
        if($childNodes.length > 0 && level == 1) {

            // recurse until leaves found (-1) or to the level specified
            if(opts.depth == -1 || (level+1 < opts.depth))
            {
                $childNodes.each(function()
                {
                    // Draw the horizontal lines
                    var $linesRow = $("<tr/>");
                    var $left = $("<td><img style='width:40px;height:1px'/></td>").addClass("line left");
                    var $middle = $("<td>&nbsp;</td>").addClass("line");
                    var $right = $("<td>&nbsp;</td>").addClass("line");
                    $linesRow.append($left).append($middle).append($right);
                    $tbody.append($linesRow);

                    // Draw cell
                    var $childNodesRow = $("<tr/>");
                    var $td1 = $("<td class='line left'/>");
                    var $td2 = $("<td class='node-container' style='padding-left:5px;'/>");
                    $td2.attr("colspan", 2);
                    $td2.append('<div class="lines"></div>');
                    buildNode($(this), $td2, level+1, opts);
                    $childNodesRow.append($td1);
                    $childNodesRow.append($td2);
                    $tbody.append($childNodesRow);
                });
            }
        }
        	
        $table.append($tbody);
        $appendTo.append($table);

        /* Prevent trees collapsing if a link inside a node is clicked */
        $nodeDiv.children('a').click(function(e){
            e.stopPropagation();
        });
    }

})(jQuery);
