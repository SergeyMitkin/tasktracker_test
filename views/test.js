/*
<li class="page-item"><a class="page-link" href="#">1</a></li>
<li class="page-item"><a class="page-link" href="#">2</a></li>
<li class="page-item"><a class="page-link" href="#">3</a></li>
*/

/*
<?
            // пагинация и get-параметры для сортировки
            for ($page=1;$page<=$count_pages;$page++){
                echo '<li class="page-item"><a class="page-link" href="index.php?page=' . $page .
                    '&first_result=' . ($page-1)*$results_per_page .
                    '&result_per_page=' . $results_per_page .
                    '&sort=' . $_GET['sort'] .
                    '&order='. $order .
                    '" class="btn">' . $page . '</a></li>';
            }
            ?>
 */

/*
<li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
*/

/*
 <li class="page-item">
                <a id="previous-page" class="page-link" href="index.php
                    ?page=<?=$page-1?>
                    &first_result=<?=($page-2)*$results_per_page?>
                    &result_per_page=<?=$results_per_page?>
                    &sort=<?=$_GET['sort']?>
                    &order=<?=$order?>
                    " aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
 */