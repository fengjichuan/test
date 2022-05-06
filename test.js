// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

// 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
// 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

a[0][0] = a[n-1-0][0]
a[0][1] = a[n-1-1][0]
a[0][2] = a[n-1-2][0]
a[0][3] = a[n-1-3][0]

a[1][0] = a[n-1-0][1]
a[1][1] = a[n-1-1][1]
a[1][2] = a[n-1-2][1]
a[1][3] = a[n-1-3][1]


// .....

function transMatrix(arr) {
    var narr = []
    var n = arr.length;
    for(var i=0;i<n;i++) {
        if(narr[i] === undefined) {
            narr[i] = [];
        }
        for(var j=0;j<n;j++) {
            narr[i][j] = arr[n-1-j][i]
        }
    }
    return narr;
}


//-----

///给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。

// 输入：points = [[1,1],[2,2],[3,3]]
// 输出：3

// 输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
// 输出：4

// 解题思路，任何两点可以组成一条直线，因此返回结果最小也是2

function findLine(arr) {
    if(arr.length == 1) {
        return 1;
    }
    var a = [];
    var len = arr.length;
    // 找到所有两个点可以组成的线
    for(var i=0;i<len;i++) {
        for(var j=(i+1);j<len;j++) {
            a.push([ arr[i], arr[j] ])
        }
    }
    
    var n = a.length;
    var s = null;
    var lp = []
    // 把所有的两个点 放在一个数组中，进行遍历查找
    for(var i=0;i<n;i++) {
        lp[i] = 2;
        // 计算每条由两点组成的直线 斜率
        s = (a[i][1][0] - a[i][0][0]) / (a[i][1][1] - a[i][0][1])
        for(var j=0;j<len;j++) {
            // 循环查找的时候如果碰到当前点，跳过
            if((arr[j][0] == a[i][0][0] && arr[j][1] == a[i][0][1]) || (arr[j][0] == a[i][1][0] && arr[j][1] == a[i][1][1])) {
                continue;
            }
            // 如果其他的点在这条线的斜率上，那么标记+1
            if( (arr[j][0] - a[i][0][0]) / (arr[j][1] - a[i][0][1]) == s) {
                lp[i] ++;
            }
        }
    }
    // 最后返回标记里面最大的数
    return Math.max(...lp)
}




// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击（皇后之间不能在一条直线上，也不能在一条斜线上）。
// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

/// ？？？？
var solveNQueens = function(n) {
    if(n == 1) {
        return [['Q']]
    }
    if(n < 4) {
        return [[]]
    }
    // 构造一个棋盘
    var q = [];
    for(var i=0;i<n;i++) {
        q[i] = (function() {
            var ar = [];
            for(var j=0;j<n;j++) {
                ar[j] = 0;
            }
            return ar;
        })()
    }
    var nq = [];

    var flag = 0;
    var tfg = 0;
    var tarr = [].concat(q);

    // 用来存放结果的数组，如果判断满足条件的，才放到这里面
    var na = [];
    
    function find(sn) {
        var ta = [];
        tarr[0][sn] = 1;
        ta[0] = sn;
        for(var i=1;i<n;i++) {
            if(sn - 1 >= 0 && !ta.includes(sn-1)) {
                ta.push(sn-1)
            }
            if(sn + 1 <= n && !ta.includes(sn+1)) {
                ta.push(sn+1)
            }
            for(var j=0;j<n;j++) {
                if(!ta.includes(j)) {
                    tarr[i][j] == 1;
                    ta.push(j);
                }
            }
            
            if(tarr[i][flag-2] !== undefined) {
                tarr[i][flag-2] = 1;
            } else if(tarr[i][flag+2] !== undefined) {
                tarr[i][flag+2] = 1;
            }
        }
    }
}



// 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[9,20],[15,7]]

var levelOrder = function(root) {
    if(!Array.isArray(root)) {
        return [];
    }
    if(root.length === 0) {
        return [];
    }
    if(root.length === 1) {
        [root]
    }
    var r = [];
    var first = root.shift();
    r.push([first]);
    var len = root.length;
    var tmp = [];
    for(var i=0;i<len;i++) {
        if(i%2 === 0) {
            tmp = [];
            if(root[i] != null) {
                tmp.push(root[i]);
            }
        } else {
            if(root[i] != null) {
                tmp.push(root[i]);
            }
            if(tmp.length != 0) {
                r.push(tmp);
            }
        }
    }
    return r;
};





////////
// 给定一个字符串 s 和一些 长度相同 的单词 words 。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
// 注意子串要与 words 中的单词完全匹配，中间不能有其他字符 ，但不需要考虑 words 中单词串联的顺序。

/*
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。

输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]

输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
输出：[6,9,12]
*/

// 思路，
// 1，先算阶乘的大小

function factorial(n) {
    if(n < 3) {
        return n;
    }
    var tmp = n;
    var rn = n;
    while(tmp > 0) {
        if(tmp == 1) {
            break;
        }
        rn = rn * (tmp - 1)
        tmp --;
    }
    return rn;
}

// 2，计算所有组合
function allsort(arr) {
    var n = arr.length;
    var fac = factorial(n)
    for (var i=0;i<fac;i++) {
        
    }
}

//////////
var findSubstring = function(s, words) {
    // 先对数组做全排列
    function allitem(words) {
        var res = [];
        sort(words, 0, words.length - 1, res);
        return res;
    }

    // 
    function sort(arr, p, q, res) {
        if(p === q) {
            // 如果数组操作完成，放入新的res中
            res.push([...arr]);
        } else {
            for(var i=p; i<=q; ++i) {
                swap(arr, i, p);
                sort(arr, p+1, q, res);
                swap(arr, i, p);
            }
        }
    }

    // 元素交换
    function swap(arr, p, q) {
        [arr[q], arr[p]] = [arr[p], arr[q]];
    }

    var narr = allitem(words);
    var len = narr.length;
    var iarr = [];
    for(var i=0;i<len;i++) {
        var sitem = narr[i].join('');
        var _i = 0;
        if(sitem.length > 0) {
            while(s.indexOf(sitem, _i) !== -1) {
                var idx = s.indexOf(sitem, _i);
                if(iarr.indexOf(idx) === -1) {
                    iarr.push(idx);
                }
                _i++;
            }
        }
    }
    return iarr;
};





//////
// 给定一个整数 n ，返回 n! 结果中尾随零的数量。

// 提示 n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1

// 输入：n = 3
// 输出：0
// 解释：3! = 6 ，不含尾随 0

// 输入：n = 5
// 输出：1
// 解释：5! = 120 ，有一个尾随 0

var trailingZeroes = function(n) {
    if(n < 5) {
        return 0;
    }
    // 计算阶乘
    function factorial(n) {
        if(n < 3) {
            return n;
        }
        var tmp = n;
        var rn = n;
        while(tmp > 0) {
            if(tmp == 1) {
                break;
            }
            rn = rn * (tmp - 1)
            tmp --;
        }
        return rn;
    }

    // 科学技术法转数字
    function toFixed(x) {
        if (Math.abs(x) < 1.0) {
          var e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          var e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
    }

    var cr = toFixed(factorial(n));
    var cl = 0;
    var len = cr.length;
    while(cr.length > 0) {
        if(cr.charAt(len - 1) == '0') {
            cl ++;
            len --;
        } else {
            break;
        }
    }
    return cl;
};










///////////////////////////////////
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

// 你可以按任意顺序返回答案。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// 定义一个单链表
 function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

// 这个解法有问题，如果遇到位数太大，超过科学计数法的，会出问题
var addTwoNumbers = function(l1, l2) {
    if(l1.next === null && l1.val === 0 && l2.next === null && l2.val === 0) {
        return new ListNode()
    }
    if(l1.next === null && l1.val === 0) {

    }
    var a1 = [], a2 = [];
    var item1 = l1.next;
    a1.push(l1.val);
    while(item1 !== null) {
        a1.push(item1.val)
        item1 = item1.next;
    }
    var item2 = l2.next;
    a2.push(l2.val);
    while(item2 !== null) {
        a2.push(item2.val);
        item2 = item2.next;
    }
    a1 = a1.reverse();
    a2 = a2.reverse();
    var a = a1.join('')*1 + a2.join('')*1;
    a = a + '';
    var arr = [];
    for(var i=0;i<a.length;i++) {
        arr.push(a.charAt(i) * 1)
    }
    arr = arr.reverse();
    var aitem = new ListNode(arr[0])
    for(var i=1;i<arr.length;i++) {
        aitem.next = new ListNode(arr[i])
        aitem = aitem.next;
    }
    return aitem;
};

// 第二种解法：通过两个节点相加，判断是否进位
var addTwoNumbers = function(l1, l2) {
    var tmp = new ListNode(0);
    var res = tmp;
    var flag = 0;
    while(l1 || l2 || flag) {
        var v1 = l1.val !== undefined ? l1.val : 0;
        var v2 = l2.val !== undefined ? l2.val : 0;
        var sum = v1 + v2 + flag;
        if(sum >= 10) {
            flag = 1;
        } else {
            flag = 0;
        }
        sum = sum % 10;
        if(l1) {
            l1 = l1.next;
        }
        if(l2) {
            l2 = l2.next;
        }
        tmp.next = new ListNode(sum);
        tmp = tmp.next;
    }
    return res.next;
}




//////
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
// 
// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 注解，这个解法太挫了，空间利用率非常差
var lengthOfLongestSubstring = function(s) {
    // var arr = [];
    var len = s.length;
    if(len === 0) {
        return 0;
    }
    if(len === 1) {
        return 1;
    }
    var slen = 0;
    for(var i=0;i<len;i++) {
        var sub = s.slice(i);
        sub = findSubStr(sub);
        if(sub.length > slen) {
            slen = sub.length;
        }
    }

    // 定义一个方法，用来存放当前字符串 从索引为0位置查找的最大字串
    function findSubStr(str) {
        var len = str.length;
        var sub = [];
        for(var i=0;i<len;i++) {
            if(sub.indexOf(str.charAt(i)) === -1) {
                sub.push(str.charAt(i));
            } else {
                break;
            }
        }
        return sub.join('');
    }
    return slen;
};

// 更好的解法，字符串头尾双指针，进行递归，发现相同元素之后，截取






// ==================
// 给你一个字符串 s，找到 s 中最长的回文子串。
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。

var longestPalindrome = function(s) {
    if(s.length <= 1) {
        return s;
    }
    function findDstr(s) {
        if(s === undefined || s.length === 0) {
            return '';
        }
        var len = s.length;
        if(len === 1) {
            return s;
        }
        var n = Math.floor(len/2);
        var flag = true;
        for(var i=0;i<n;i++) {
            if(s.charAt(i) !== s.charAt(len-1-i)) {
                flag = false;
            }
        }
        return flag ? s : '';
    }

    var len = s.length;
    var n = 0;
    var substr = '';
    for(var i=0;i<len;i++) {
        for(var j=len-1;j>i;j--) {
            if(s.charAt(i) === s.charAt(j)) {
                var _s = findDstr(s.slice(i, j+1))
                if(_s.length > n) {
                    substr = _s;
                    n = _s.length;
                }
            }
        }
    }
    return substr;
};



// =============
// 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1 。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// 给定一个罗马数字，将其转换成整数。

var romanToInt = function(s) {
    var list = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    var sum = 0;
    var item1 = null;
    var item2 = null;
    for(var i=0;i<s.length;i++) {
        item1 = list[s.charAt(i)];
        item2 = list[s.charAt(i+1)];
        if(item1 < item2) {
            sum += item2 - item1;
            i++;
        } else {
            sum += item1;
        }
    }
    return sum;
};


// ======================
// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。
// 输入：strs = ["flower","flow","flight"]
// 输出："fl"

// 输入：strs = ["dog","racecar","car"]
// 输出：""
// 解释：输入不存在公共前缀。

var longestCommonPrefix = function(strs) {

    function towPre(a, b) {
        var la = a.length;
        var lb = b.length;
        var n = la > lb ? lb : la;
        var pre = '';
        var tmpA = '';
        var tmpB = '';
        for(var i=0;i<n;i++) {
            tmpA = a.charAt(i);
            tmpB = b.charAt(i);
            if(tmpA === tmpB) {
                pre += tmpA
            } else {
                break;
            }
        }
        return pre;
    }
    var rt = '';
    function fastFind(st) {
        if(st.length === 1) {
            rt = st[0];
            return;
        }
        var sl = st.length;
        var n = sl % 2 > 0 ? Math.floor(sl/2) + 1 : sl/2;
        var ta = '';
        var tb = '';
        var tmp = '';
        var pres = [];
        for(var i=0;i<n;i++) {
            ta = st[i];
            tb = st[sl-1-i];
            tmp = towPre(ta, tb);
            if(tmp === '') {
                return;
            }
            pres.push(tmp);
        }
        fastFind(pres);
    }
    fastFind(strs);
    return rt;
};




// ==========
// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
// 输入：nums = [1,5,11,5]
// 输出：true
// 解释：数组可以分割成 [1, 5, 5] 和 [11] 。

// 输入：nums = [1,2,3,5]
// 输出：false
// 解释：数组不能分割成两个元素和相等的子集。

var canPartition = function(nums) {
    // 【处理边界条件】如果不够分割，返回
    if(nums.length < 2) {
        return false;
    }
    // 【处理边界条件】如果是两个元素，并且相等，返回
    if(nums.length === 2 && nums[0] === nums[1]) {
        return true;
    }
    // 先计算所有的总和
    var len = nums.length;
    var sum = 0;
    var max = 0;    // 并且找到最大值
    var item = 0;
    // 一次遍历找到所有值的总和，并且找到其中的最大值
    for(var i=0;i<len;i++) {
        item = nums[i];
        if(item > max) {
            max = item;
        }
        sum += item;
    }
    // 如果总和是奇数，返回false
    if(sum%2 > 0) {
        return false;
    }
    var mid = sum/2;
    // 如果数组中的最大值 要比中位数大，返回false
    if(max > mid) {
        return false;
    }

    function towSum(list, target) {
        var l = list.length;
        for(var i=0;i<l;i++) {
            for(var j=i;j<l-i;j++) {
                if(list[i] + list[j] === target) {
                    return true;
                }
            }
        }
        return false;
    }

    nums = nums.sort(function(x, y) {
        return x - y;
    });
    // 开始两层遍历计算
    var tmpsum = 0;
    var tmplist = [];
    for(var i=0;i<len;i++) {
        tmpsum += nums[i];
        if(tmpsum > mid) {
            tmplist = nums.slice(0, i+1);
            tmpsum = mid - tmpsum;
            break;
        }
    }
    return towSum(tmplist, tmpsum);
};





// =========
// 9. 回文数
// 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

// 例如，121 是回文，而 123 不是。

var isPalindrome = function(x) {
    x = x + '';
    var l = x.length;
    var x1 = null;
    var x2 = null;
    for(var i=0;i<l;i++) {
        if(i >= l-1-i) break;
        x1 = x.charAt(i);
        x2 = x.charAt(l-1-i);
        if(x1 !== x2) {
            return false;
        }
    }
    return true;
};




// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

var isValid = function(s) {
    var ob = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    var list = [')','}',']'];
    var tmp = [];
    var len = s.length;
    if(len%2 > 0) {
        return false;
    }
    var item = null;
    var t2 = [];
    for(var i=0;i<len;i++) {
        item = s.charAt(i);
        if(list.indexOf(item) === -1) {
            tmp.push(item);
        } else if(ob[item] === tmp[tmp.length-1]) {
            tmp.pop();
        } else {
            t2.push(item);
        }
    }
    return tmp.length === 0 && t2.length === 0;
}





///// =============================
// 4. 寻找两个正序数组的中位数
// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

// 算法的时间复杂度应该为 O(log (m+n)) 。

// 解法1
var findMedianSortedArrays = function(nums1, nums2) {
    var list = nums1.concat(nums2);
    list = list.sort(function(a, b) {
        return a - b;
    });
    var len = list.length;
    if(len%2 > 0) {
        return list[Math.floor(len/2)];
    } else {
        var a = list[len/2 - 1];
        var b = list[l2n/2];
        return (a+b)/2;
    }
};

// 解法2（。。。。。。。）
var findMedianSortedArrays = function(nums1, nums2) {
    var la = nums1.length;
    var lb = nums2.length;
    var idx = (la + lb)%2 > 0 ? [Math.floor((la + lb)/2)] : [(la + lb)/2 - 1, (la + lb)/2];
    var rt = [];
    var i = 0;
    var j = 0;
    while(nums1[i] !== undefined && nums2[j] !== undefined) {
        if(idx.length === 1 && (i+j) === idx[0]) {
            rt.push(i>j ? nums1[i] : nums2[j])
        } else {

        }
        if(nums1[i] > nums2[j]) {
            j ++;
        } else {
            i ++;
        }
    }
}





// ========
// 15. 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

var threeSum = function(nums) {

    // 判断两数之和是否等于target
    function twoSum(a, b, target) {
        return (a + b) + target === 0;
    }

    // 重新排序去重


    var arr = [];
    var len = nums.length;
    var index = 0;
    var i = 0;
    var j = len-1;
    var tmp = [];
    var tmpItem = null;
    var tmpStr = [];
    function sum(idx) {
        
        var tgt = nums[idx];
        if(tgt === undefined) {
            return;
        }
        if(tmp.includes(idx)) {
            index ++;
            sum(index);
            return;
        }
        

        for(var i=0;i<len;i++) {
            if(i === idx) {
                i++;
            }

            for(var j = i+1;j<len;j++) {
                if(j === idx) {
                    j++
                }
                if(twoSum(nums[i], nums[j], tgt)) {
                    tmpItem = [nums[i], nums[j], tgt].sort(function(a, b) {
                        return a - b;
                    });
                    if(!tmpStr.includes(tmpItem.join())) {
                        arr.push(tmpItem);
                        tmpStr.push(tmpItem.join());
                    }
                    tmp.push(i);
                    tmp.push(j);
                }
            }
        }
        index ++;
        sum(index);
    }
    sum(index);
    return arr;
};





//// =========
// 11. 盛最多水的容器
// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 返回容器可以储存的最大水量。

// 说明：你不能倾斜容器。
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

/// 解法1，肯定超时。。。。。
var maxArea = function(height) {
    if(height.length < 2) {
        return 0;
    }
    var len = height.length;
    var max = 0;
    var tmp = 0;
    var a = null;
    var b = null;
    for(var i=0;i<len;i++) {
        for(var j=i+1;j<len;j++) {
            a = height[i];
            b = height[j];
            if(a > b) {
                tmp = b * (j-i);
            } else {
                tmp = a * (j-i);
            }
            if(tmp > max) {
                max = tmp;
            }
        }
    }
    return max;
};


// 解法2，双指针
var maxArea = function(height) {
    if(height.length < 2) {
        return 0;
    }
    var left = 0;
    var right = height.length - 1;
    var max = 0;
    var a = null;
    var b = null;
    while(left < right) {
        a = height[left];
        b = height[right];
        if(a < b) {
            max = a * (right - left) > max ? a * (right - left) : max;
            left ++;
        } else {
            max = b * (right - left) > max ? b * (right - left) : max;
            right --;
        }
    }
    return max;
}





/// =========
// 139. 单词拆分
// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

// ???? 解题不对，要用BFS
var wordBreak = function(s, wordDict) {
    var len = wordDict.length;
    var tmp = s;
    for(var i=0;i<len;i++) {
        if(s.indexOf(wordDict[i]) > -1) {
            s = s.replaceAll(wordDict[i], '');
        }
    }
    for(var i=len-1;i>=0;i--) {
        if(tmp.indexOf(wordDict[i]) > -1) {
            tmp = tmp.replaceAll(wordDict[i], '');
        }
    }
    return s === '' && tmp === '';
};


// ======
// 217. 存在重复元素
// 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
// 输入：nums = [1,2,3,1]
// 输出：true

var containsDuplicate = function(nums) {
    var len = nums.length;
    for(var i=0;i<len;i++) {
        for(var j=i+1;j<len;j++) {
            if(nums[i] === nums[j]) {
                return true;
            }
        }
    }
    return false;
};


//// =====
// 56. 合并区间
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

var merge = function(intervals) {
    // 先对原数组排序
    intervals = intervals.sort(function(a, b) {
        return a[0] - b[0];
    });
    var i = 0;
    while(i < intervals.length - 1 && intervals.length > 1) {
        if(intervals[i][1] >= intervals[i+1][0]) {
            if(intervals[i][1] < intervals[i+1][1]) {
                intervals[i][1] = intervals[i+1][1];
            }
            intervals.splice(i+1, 1);
        } else {
            i++;
        }
    }
    return intervals;
};



// =======
// 58. 最后一个单词的长度
// 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
// 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。

var lengthOfLastWord = function(s) {
    var len = s;
    var tmp = '';
    var i = 0;
    while(len > 0 && tmp != ' ') {
        if(s[len-1] != ' ') {
            i ++;
            len --;
        }
    }
    return i;
};




///// =====
// 152. 乘积最大子数组
// 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
// 测试用例的答案是一个 32-位 整数。
// 子数组 是数组的连续子序列。
// ??? 内存溢出了。。。
var maxProduct = function(nums) {
    var len = nums.length;
    var max = [];
    var rt = null;
    var tmpLen = 0;
    for(var i=0;i<len;i++) {
        max.push(nums[i]);
        for(var j=i+1;j<len;j++) {
            tmpLen = max.length;
            max.push(max[tmpLen-1]*nums[j])
        }
    }
    return max.sort(function(a, b) {
        return b - a;
    })[0];
};



// ======= 46题
// DFS全排列
var arr = [1,2,3,4];
var len = arr.length;
var tmp = [];
var res = [];
var DFS = function(a) {
    if(a.length === len) {
        res.push(a);
        return;
    }
    for(var i=0;i<len;i++) {
        if(a.indexOf(arr[i]) === -1) {
            a.push(arr[i]);
            DFS(a.slice());
            a.pop();
        }
    }
}

var permute = function(nums) {
    var len = nums.length;
    var res = [];
    function dfs(a) {
        if(a.length === len) {
            res.push(a);
            return;
        }
        for(var i=0;i<len;i++) {
            if(a.indexOf(nums[i]) === -1) {
                a.push(nums[i]);
                dfs(a.slice());
                a.pop();
            }
        }
    }
    dfs([]);
    return res;
};



// ======
// 300. 最长递增子序列
// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
// ???
var lengthOfLIS = function(nums) {
    var len = nums.length;
    var max = [];
    for(var i=0;i<len;i++) {
        max[i] = 1;
        for(var j=i+1;j<len;j++) {
            if(nums[j] > nums[i]) {
                max[i] ++;
            }
        }
    }
    return max;
};





// ==== 
// 205. 同构字符串
// 给定两个字符串 s 和 t ，判断它们是否是同构的。
// 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
// 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。

var isIsomorphic = function(s, t) {
    var la = s.length;
    var lb = t.length;
    if(la.length !== lb.length) {
        return false;
    }
    var o = {};
    var ta = null;
    var tb = null;
    for(var i=0;i<la;i++) {
        ta = s.charAt(i);
        tb = t.charAt(i);
        if(!o[ta]) {
            o[ta] = tb;
        } else if(o[ta] !== tb) {
            return false;
        }
    }
    return true;
};





/// =======
// 239. 滑动窗口最大值
// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回 滑动窗口中的最大值 。

var maxSlidingWindow = function(nums, k) {
    // 
    function rtMax(arr) {
        var len = arr.length;
        var max;
        for(var i=0;i<len;i++) {
            if(max === undefined) {
                max = arr[i];
            }
            if(arr[i] > max) {
                max = arr[i]
            }
        }
        return max;
    }

    var len = nums.length;
    var list = [];
    for(var i=0;i<len;i++) {
        if(list[0] === undefined || list[list.length-1]) {}
    }
};



/////// =======
// test GitHub Copilot
function calculateDaysBetweenDates(begin, end){
    
}


///// =====
// 1823. 找出游戏的获胜者
// 共有 n 名小伙伴一起做游戏。小伙伴们围成一圈，按 顺时针顺序 从 1 到 n 编号。确切地说，从第 i 名小伙伴顺时针移动一位会到达第 (i+1) 名小伙伴的位置，其中 1 <= i < n ，从第 n 名小伙伴顺时针移动一位会回到第 1 名小伙伴的位置。

// 游戏遵循如下规则：

// 从第 1 名小伙伴所在位置 开始 。
// 沿着顺时针方向数 k 名小伙伴，计数时需要 包含 起始时的那位小伙伴。逐个绕圈进行计数，一些小伙伴可能会被数过不止一次。
// 你数到的最后一名小伙伴需要离开圈子，并视作输掉游戏。
// 如果圈子中仍然有不止一名小伙伴，从刚刚输掉的小伙伴的 顺时针下一位 小伙伴 开始，回到步骤 2 继续执行。
// 否则，圈子中最后一名小伙伴赢得游戏。
// 给你参与游戏的小伙伴总数 n ，和一个整数 k ，返回游戏的获胜者。

var findTheWinner = function(n, k) {
    var arr = [];
    for(var j=0;j<n;j++) {
        arr[j] = j+1;
    }
    var i = 0;
    var m = null;
    while(arr.length > 1) {
        m = ((k + i) - 1) % arr.length;
        arr.splice(m, 1);
        i = m + 1;
    }
    return arr[0];
};




/// 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

// 解法1：暴力破解
var trap = function(height) {
    var len = height.length;
    if(len <= 2) {
        return 0;
    }
    var res = 0;
    for(var i=0;i<len;i++) {
        var lmax = 0;
        var rmax = 0;
        for(var j=i;j<len;j++) {
            rmax = Math.max(height[j], rmax);
        }
        for(var k=i;k>=0;k--) {
            lmax = Math.max(height[k], lmax);
        }
        res += Math.min(lmax, rmax) - height[i];
    }
    return res;
};

// 解法2: 缓存记录法
var trap = function(height) {
    var len = height.length;
    if(len <= 2) {
        return 0;
    }
    var res = 0;
    var larr = [height[0]];
    var rarr = [height[len-1]];
    for(var i=1;i<len;i++) {
        larr.push(Math.max(larr[larr.length-1], height[i]));
    }
    for(var j=len-2;j>=0;j--) {
        rarr.unshift(Math.max(rarr[0], height[j]));
    }
    for(var k=0;k<len;k++) {
        res += Math.min(larr[k], rarr[k]) - height[k];
    }
    return res;
};




