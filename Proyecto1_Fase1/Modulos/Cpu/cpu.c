#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>

#include <linux/fs.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/mm.h>
#include <linux/swap.h>

#include <linux/cpumask.h>
#include <linux/kernel_stat.h>
#include <linux/mmzone.h>
#include <linux/vmstat.h>
#include <linux/hugetlb.h>
#include <asm/uaccess.h>

	
static int my_proc_show(struct seq_file *archivo, void *v) {
	unsigned long cpu = *((unsigned long*) cpu_possible_mask->bits);
	unsigned long total = 0;
	unsigned long idle = 0;
	struct kernel_cpustat *info = NULL;

	int idx = 0;
	while(cpu) {
		info = (struct kernel_cpustat*) ((unsigned long) __per_cpu_offset[idx]+(unsigned long)&kernel_cpustat);

		total += info->cpustat[CPUTIME_USER];
		total += info->cpustat[CPUTIME_NICE];
		total += info->cpustat[CPUTIME_SYSTEM];
		total += info->cpustat[CPUTIME_IDLE];
		total += info->cpustat[CPUTIME_IOWAIT];
		total += info->cpustat[CPUTIME_IRQ];
		total += info->cpustat[CPUTIME_SOFTIRQ];
		total += info->cpustat[CPUTIME_STEAL];
		
		idle += info->cpustat[CPUTIME_IDLE];
		idle += info->cpustat[CPUTIME_IOWAIT];

		cpu /= 2;
	}

	seq_printf(archivo, "{\n");
	seq_printf(archivo, "\t\"porcentaje\": %lu\n", ((idle * 100)/total));
	seq_printf(archivo, "}\n");
	return 0;
}

static ssize_t my_proc_write(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos) {
	return 0;
}

static int my_proc_open(struct inode *inode, struct file *file)
{
	return single_open(file, my_proc_show, NULL);
}

static struct proc_ops my_fops = {
	.proc_open = my_proc_open,
	.proc_read = seq_read,
};

static int __init cpumod_init(void) {
	proc_create("cpu_201612218", 0, NULL, &my_fops);
	printk(KERN_INFO "SUSAN PAMELA HERRERA MONZÓN\n");
	return 0;
}

static void __exit cpumod_exit(void) {
	remove_proc_entry("cpu_201612218", NULL);
	printk(KERN_INFO "SUSAN PAMELA HERRERA MONZÓN\n");
} 

module_init(cpumod_init);
module_exit(cpumod_exit);

MODULE_LICENSE("Proyecto 1 - SO1");
MODULE_AUTHOR("SUSAN PAMELA HERRERA MONZÓN");
MODULE_DESCRIPTION("Modulo para obtener uso de CPU");
MODULE_VERSION("v1");
